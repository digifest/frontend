import { create } from 'zustand';
import { Document, SearchDocuments } from '../types';
import { persist } from 'zustand/middleware';

type DocumentState = {
  query?: SearchDocuments;
  downloaded_documents?: Document[] | undefined;
};

type DocumentActions = {
  updateQuery?(q: SearchDocuments): void;
  updateSpeficQueryAttr?(key: keyof SearchDocuments, value: any): void;
  updateDownloadedDocuments?(document: Document): void;
};

export type DocumentStore = DocumentState & DocumentActions;

export const useDocumentStore = create<DocumentStore>()((set, get) => ({
  query: undefined,
  updateQuery: (q) => set({ query: q }),
  updateSpeficQueryAttr: (key: keyof SearchDocuments, value: any) =>
    set({ query: { ...get().query, [key]: value } }),
}));

export const usePersistedDocumentStore = create<DocumentStore>()(
  persist(
    (set, get) => ({
      downloaded_documents: [],
      updateDownloadedDocuments(document) {
        let downloaded_documents = get().downloaded_documents;

        if (downloaded_documents) {
          if (downloaded_documents.find((d) => d._id === document._id)) {
            downloaded_documents = downloaded_documents.filter(
              (doc) => doc._id != document._id
            );
          }

          if (downloaded_documents?.length > 5) {
            downloaded_documents.pop();
          }
          downloaded_documents.unshift(document);
        } else {
          downloaded_documents = [document];
        }

        set({ downloaded_documents });
      },
    }),
    { name: 'document-store' }
  )
);
