import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_DOCUMENTS } from '../data/documents';

export const useDocumentStore = create(
  persist(
    (set, get) => ({
      documents: INITIAL_DOCUMENTS,

      addDocument: (newDoc) => {
        set((state) => ({
          documents: [newDoc, ...state.documents]
        }));
      },

      updateDocument: (id, updatedFields) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, ...updatedFields } : doc
          )
        }));
      },

      deleteDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id)
        }));
      },

      resetToDefault: () => {
        set({ documents: INITIAL_DOCUMENTS });
      },

      getDocumentById: (id) => {
        return get().documents.find((doc) => doc.id === id);
      }
    }),
    {
      name: 'transitdoc-documents-storage',
    }
  )
);
