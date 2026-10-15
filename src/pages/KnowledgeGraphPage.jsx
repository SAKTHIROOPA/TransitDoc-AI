import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import {
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Search,
  Filter,
  X,
  ExternalLink,
  ChevronRight,
  Info,
  Shield,
  Bus,
  UserCheck,
  Building2,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';
import { buildKnowledgeGraph, NODE_TYPES, EDGE_TYPES } from '../data/graphData';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function KnowledgeGraphPage() {
  const { documents } = useDocumentStore();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Filters & State
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [physicsPaused, setPhysicsPaused] = useState(false);
  const [searchNodeQuery, setSearchNodeQuery] = useState('');
  const [enabledTypes, setEnabledTypes] = useState({
    Vehicle: true,
    Engineer: true,
    Depot: true,
    Report: true,
    Incident: true,
  });

  // Build raw graph data
  const rawGraph = useMemo(() => {
    return buildKnowledgeGraph(documents);
  }, [documents]);

  // Filtered nodes and links based on checkboxes
  const graphData = useMemo(() => {
    const activeNodes = rawGraph.nodes.filter((n) => enabledTypes[n.type]);
    const activeNodeIdSet = new Set(activeNodes.map((n) => n.id));

    const activeLinks = rawGraph.links.filter(
      (l) => activeNodeIdSet.has(typeof l.source === 'object' ? l.source.id : l.source) &&
             activeNodeIdSet.has(typeof l.target === 'object' ? l.target.id : l.target)
    );

    return {
      nodes: activeNodes.map((n) => ({ ...n })),
      links: activeLinks.map((l) => ({ ...l }))
    };
  }, [rawGraph, enabledTypes]);

  // D3 references
  const simulationRef = useRef(null);
  const transformRef = useRef(d3.zoomIdentity);
  const zoomBehaviorRef = useRef(null);

  // Neighbor lookup map for fast highlighting
  const neighborsMap = useMemo(() => {
    const map = new Map();
    graphData.nodes.forEach((n) => map.set(n.id, new Set()));

    graphData.links.forEach((l) => {
      const sId = typeof l.source === 'object' ? l.source.id : l.source;
      const tId = typeof l.target === 'object' ? l.target.id : l.target;
      if (map.has(sId) && map.has(tId)) {
        map.get(sId).add(tId);
        map.get(tId).add(sId);
      }
    });

    return map;
  }, [graphData]);

  // Selected node's connected entities list
  const selectedConnectedEntities = useMemo(() => {
    if (!selectedNode) return [];
    const connectedIds = neighborsMap.get(selectedNode.id) || new Set();

    return graphData.nodes
      .filter((n) => connectedIds.has(n.id))
      .map((n) => {
        // Find relation link
        const link = graphData.links.find((l) => {
          const sId = typeof l.source === 'object' ? l.source.id : l.source;
          const tId = typeof l.target === 'object' ? l.target.id : l.target;
          return (sId === selectedNode.id && tId === n.id) || (sId === n.id && tId === selectedNode.id);
        });

        return {
          node: n,
          relation: link?.relation || 'RELATED_TO'
        };
      });
  }, [selectedNode, neighborsMap, graphData]);

  // Main Canvas Setup & D3 Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = containerRef.current?.clientWidth || 900;
    const height = 580;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Initialize D3 Simulation
    const simulation = d3
      .forceSimulation(graphData.nodes)
      .force(
        'link',
        d3
          .forceLink(graphData.links)
          .id((d) => d.id)
          .distance(110)
      )
      .force('charge', d3.forceManyBody().strength(-240))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(28));

    simulationRef.current = simulation;

    // Render loop
    function render() {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const transform = transformRef.current;
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      const isNodeSelected = selectedNode !== null;
      const connectedNeighbors = selectedNode ? neighborsMap.get(selectedNode.id) : null;

      // 1. Draw Links
      graphData.links.forEach((link) => {
        const source = link.source;
        const target = link.target;
        if (!source || !target || source.x === undefined || target.x === undefined) return;

        const isConnectedToSelected =
          selectedNode &&
          (source.id === selectedNode.id || target.id === selectedNode.id);

        let alpha = 0.5;
        let strokeWidth = 1.2;

        if (isNodeSelected) {
          if (isConnectedToSelected) {
            alpha = 0.9;
            strokeWidth = 2.2;
          } else {
            alpha = 0.08;
          }
        }

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();

        // Edge label (drawn only if zoomed in or connected to selected)
        if (transform.k > 0.85 || isConnectedToSelected) {
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2;
          ctx.save();
          ctx.font = '8px Inter, sans-serif';
          ctx.fillStyle = isConnectedToSelected ? '#1D4ED8' : `rgba(100, 116, 139, ${alpha})`;
          ctx.textAlign = 'center';
          ctx.fillText(link.relation || '', midX, midY - 3);
          ctx.restore();
        }
      });

      // 2. Draw Nodes
      graphData.nodes.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return;

        const typeConfig = NODE_TYPES[node.type] || NODE_TYPES.Report;
        const isSelf = selectedNode && selectedNode.id === node.id;
        const isNeighbor = connectedNeighbors && connectedNeighbors.has(node.id);
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        const matchesSearch =
          searchNodeQuery.trim() !== '' &&
          (node.label.toLowerCase().includes(searchNodeQuery.toLowerCase()) ||
            node.id.toLowerCase().includes(searchNodeQuery.toLowerCase()));

        let alpha = 1.0;
        if (isNodeSelected && !isSelf && !isNeighbor) {
          alpha = 0.2;
        }

        ctx.save();
        ctx.globalAlpha = alpha;

        // Outer glow / selection ring
        if (isSelf || isHovered || matchesSearch) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, typeConfig.radius + 6, 0, 2 * Math.PI);
          ctx.fillStyle = isSelf ? 'rgba(29, 78, 216, 0.25)' : 'rgba(59, 130, 246, 0.2)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, typeConfig.radius + 4, 0, 2 * Math.PI);
          ctx.strokeStyle = isSelf ? '#1D4ED8' : '#3B82F6';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Base node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, typeConfig.radius, 0, 2 * Math.PI);
        ctx.fillStyle = typeConfig.color;
        ctx.fill();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Label
        ctx.font = `${isSelf ? 'bold 11px' : '10px'} Inter, sans-serif`;
        ctx.fillStyle = alpha < 0.5 ? '#94A3B8' : '#0F172A';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw text background pill for legibility
        const labelText = node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label;
        const textWidth = ctx.measureText(labelText).width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillRect(node.x - textWidth / 2 - 4, node.y + typeConfig.radius + 3, textWidth + 8, 14);

        ctx.fillStyle = alpha < 0.5 ? '#64748B' : '#0F172A';
        ctx.fillText(labelText, node.x, node.y + typeConfig.radius + 10);

        ctx.restore();
      });

      ctx.restore();
    }

    simulation.on('tick', render);

    // Zoom & Pan Behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        transformRef.current = event.transform;
        render();
      });

    zoomBehaviorRef.current = zoom;
    d3.select(canvas).call(zoom);

    // Initial center fit
    d3.select(canvas).call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85).translate(-width / 2, -height / 2));

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [graphData, selectedNode, hoveredNode, searchNodeQuery, neighborsMap]);

  // Canvas Interaction: Find node under mouse
  const getNodeAtPos = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const transform = transformRef.current;
    const graphX = (mouseX - transform.x) / transform.k;
    const graphY = (mouseY - transform.y) / transform.k;

    return graphData.nodes.find((node) => {
      const typeConfig = NODE_TYPES[node.type] || NODE_TYPES.Report;
      const dx = graphX - node.x;
      const dy = graphY - node.y;
      return Math.sqrt(dx * dx + dy * dy) <= typeConfig.radius + 4;
    });
  };

  const handleCanvasClick = (e) => {
    const clickedNode = getNodeAtPos(e.clientX, e.clientY);
    if (clickedNode) {
      setSelectedNode(clickedNode);
    } else {
      setSelectedNode(null);
    }
  };

  const handleCanvasMouseMove = (e) => {
    const node = getNodeAtPos(e.clientX, e.clientY);
    setHoveredNode(node || null);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = node ? 'pointer' : 'grab';
    }
  };

  // Drag Support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let draggedNode = null;

    const drag = d3
      .drag()
      .container(canvas)
      .subject((event) => getNodeAtPos(event.sourceEvent.clientX, event.sourceEvent.clientY))
      .on('start', (event) => {
        if (!event.subject) return;
        draggedNode = event.subject;
        if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0.3).restart();
        draggedNode.fx = draggedNode.x;
        draggedNode.fy = draggedNode.y;
      })
      .on('drag', (event) => {
        if (!draggedNode) return;
        const transform = transformRef.current;
        draggedNode.fx = (event.x - transform.x) / transform.k;
        draggedNode.fy = (event.y - transform.y) / transform.k;
      })
      .on('end', (event) => {
        if (!draggedNode) return;
        if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0);
        draggedNode.fx = null;
        draggedNode.fy = null;
        draggedNode = null;
      });

    d3.select(canvas).call(drag);
  }, [graphData]);

  // Controls
  const handleZoomIn = () => {
    if (zoomBehaviorRef.current && canvasRef.current) {
      d3.select(canvasRef.current).transition().duration(250).call(zoomBehaviorRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (zoomBehaviorRef.current && canvasRef.current) {
      d3.select(canvasRef.current).transition().duration(250).call(zoomBehaviorRef.current.scaleBy, 0.75);
    }
  };

  const handleFitToScreen = () => {
    if (zoomBehaviorRef.current && canvasRef.current && containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = 580;
      d3.select(canvasRef.current)
        .transition()
        .duration(400)
        .call(
          zoomBehaviorRef.current.transform,
          d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85).translate(-width / 2, -height / 2)
        );
    }
  };

  const togglePhysics = () => {
    if (!simulationRef.current) return;
    if (physicsPaused) {
      simulationRef.current.restart();
      setPhysicsPaused(false);
    } else {
      simulationRef.current.stop();
      setPhysicsPaused(true);
    }
  };

  const toggleTypeFilter = (typeName) => {
    setEnabledTypes((prev) => ({
      ...prev,
      [typeName]: !prev[typeName]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wider">
              Amazon Neptune Property Graph
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {graphData.nodes.length} Vertices &bull; {graphData.links.length} Typed Relations
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Transit Operations Knowledge Graph
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive multi-relational force-directed graph connecting Tamil Nadu buses, maintenance dockets, supervising engineers, and incident dockets.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {Object.entries(NODE_TYPES).map(([type, config]) => (
            <button
              key={type}
              onClick={() => toggleTypeFilter(type)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                enabledTypes[type]
                  ? 'bg-slate-50 text-slate-800 border-slate-200 shadow-2xs'
                  : 'bg-slate-100 text-slate-400 border-dashed border-slate-300 opacity-60'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Graph Workspace Box */}
      <div ref={containerRef} className="relative bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden min-h-[580px]">
        {/* Controls Toolbar Overlay */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          {/* Node Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchNodeQuery}
              onChange={(e) => setSearchNodeQuery(e.target.value)}
              placeholder="Filter graph node..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-900/90 text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md w-40 sm:w-52"
            />
          </div>

          <div className="flex items-center bg-slate-900/90 border border-slate-700 rounded-xl p-1 backdrop-blur-md text-slate-300">
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleFitToScreen}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Fit to Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={togglePhysics}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title={physicsPaused ? "Resume Physics Simulation" : "Pause Physics Simulation"}
            >
              {physicsPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Instructions helper overlay */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-[11px] text-slate-400 backdrop-blur-xs">
          <span>Click any node to focus neighbors &bull; Drag to rearrange &bull; Scroll to zoom</span>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          className="w-full h-[580px] block"
        />

        {/* Hover Tooltip Overlay */}
        {hoveredNode && !selectedNode && (
          <div
            className="absolute z-20 pointer-events-none p-2.5 bg-slate-900/95 text-white rounded-xl border border-slate-700 shadow-xl text-xs max-w-xs animate-in fade-in duration-100"
            style={{
              left: `${Math.min(hoveredNode.x || 100, (containerRef.current?.clientWidth || 800) - 180)}px`,
              top: `${Math.max(20, (hoveredNode.y || 100) - 70)}px`
            }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: NODE_TYPES[hoveredNode.type]?.color || '#3B82F6' }}
              />
              <span className="font-bold text-slate-200 uppercase text-[9px]">{hoveredNode.type}</span>
            </div>
            <p className="font-bold text-white mt-0.5">{hoveredNode.label}</p>
            {hoveredNode.category && (
              <p className="text-[10px] text-blue-300 mt-0.5">{hoveredNode.category}</p>
            )}
          </div>
        )}

        {/* Slide-out Node Inspector Panel */}
        {selectedNode && (
          <div className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-slate-900/95 border-l border-slate-800 text-white z-20 p-5 flex flex-col justify-between backdrop-blur-md animate-in slide-in-from-right duration-200">
            <div className="space-y-4 overflow-y-auto pr-1">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: NODE_TYPES[selectedNode.type]?.color || '#3B82F6' }}
                  >
                    {selectedNode.type} Node
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 break-all">
                    {selectedNode.label}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">ID: {selectedNode.id}</p>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Node Specific Metadata */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Entity Attributes
                </span>
                {selectedNode.type === 'Report' && (
                  <>
                    <div className="flex justify-between"><span className="text-slate-400">Category:</span> <span className="font-semibold text-blue-300">{selectedNode.category}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Date:</span> <span className="text-slate-200">{formatDate(selectedNode.date)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Incurred Cost:</span> <span className="font-mono font-bold text-emerald-400">{formatCurrency(selectedNode.cost)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Risk Assessment:</span> <span className="font-bold text-rose-400">{selectedNode.riskLevel}</span></div>
                  </>
                )}
                {selectedNode.type === 'Vehicle' && (
                  <>
                    <div className="flex justify-between"><span className="text-slate-400">Plate Number:</span> <span className="font-mono font-bold text-white">{selectedNode.vehicleNumber}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Home Depot:</span> <span className="text-slate-200">{selectedNode.depot}</span></div>
                  </>
                )}
                {selectedNode.type === 'Engineer' && (
                  <>
                    <div className="flex justify-between"><span className="text-slate-400">Designation:</span> <span className="text-slate-200">Senior Mechanical Engineer</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Stationed Depot:</span> <span className="text-slate-200">{selectedNode.depot}</span></div>
                  </>
                )}
                {selectedNode.type === 'Depot' && (
                  <>
                    <div className="flex justify-between"><span className="text-slate-400">Region:</span> <span className="text-slate-200">Western / Central Tamil Nadu</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Workshop Capacity:</span> <span className="text-slate-200">45 Active Bays</span></div>
                  </>
                )}
                {selectedNode.type === 'Incident' && (
                  <>
                    <div className="flex justify-between"><span className="text-slate-400">Classification:</span> <span className="font-bold text-rose-400">{selectedNode.incidentType}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Severity:</span> <span className="text-amber-300 font-semibold">Priority Workshop Audit</span></div>
                  </>
                )}
              </div>

              {/* Connected Relationships List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Connected Entities ({selectedConnectedEntities.length})
                </span>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {selectedConnectedEntities.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedNode(item.node)}
                      className="p-2.5 bg-slate-800/40 hover:bg-slate-800 rounded-xl border border-slate-700/60 cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400 block">
                          {item.relation}
                        </span>
                        <p className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                          {item.node.label}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Neptune SPARQL / Gremlin</span>
              <button
                onClick={() => setSelectedNode(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Reset Focus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
