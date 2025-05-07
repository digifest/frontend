'use client';

import { motion } from 'framer-motion';
import { FileQuestion, FileText } from 'lucide-react';
import { usePersistedDocumentStore } from '@/lib/store/documents.store';
import { DocType } from '@/lib/enums';

export default function QuickAccessAnimation() {
  const { downloaded_documents } = usePersistedDocumentStore();

  return (
    <div className="space-y-2">
      {(downloaded_documents ?? []).map((item, index) => {
        const Icon =
          item.document_type === DocType.lecture_note ? FileText : FileQuestion;
        const isActive = false;

        return (
          <motion.div
            key={index}
            className={`flex items-center gap-2 py-2 px-3 rounded-md relative ${
              isActive ? 'bg-gray-100 ' : ''
            }`}
            animate={{
              borderColor: isActive
                ? 'rgba(34, 197, 94, 0.5)'
                : 'rgba(0, 0, 0, 0)',
              scale: isActive ? 1.02 : 1, // Subtle scale effect for active item
              boxShadow: isActive
                ? '0 2px 8px rgba(34, 197, 94, 0.08)'
                : '0 0 0 rgba(0, 0, 0, 0)',
            }}
            transition={{
              duration: 0.8, // Slower transition
              ease: 'easeInOut',
            }}
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
          >
            <Icon
              className={`h-4 w-4 ${
                isActive ? 'text-green-500' : 'text-gray-400'
              }`}
            />
            <span
              className={`text-sm truncate ${isActive ? 'font-medium' : ''}`}
            >
              {item.name}
            </span>

            {isActive && (
              <>
                {/* Pulsing highlight effect */}
                <div className="absolute inset-0 rounded-md bg-blue-500/5 pointer-events-none pulse-animation" />
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
