// // Simplified toast implementation
// export const toast = ({ title, description }: { title: string; description?: string }) => {
//   console.log(`Toast: ${title}${description ? ` - ${description}` : ''}`);
//   // In a real implementation, this would show a toast notification
//   // For now, we'll just log to the console
// };

// use-toast.tsx
import { useState } from 'react';

export function Toast({ title, description }: { title: string; description?: string }) {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black text-white rounded shadow">
      <strong>{title}</strong>
      {description && <p>{description}</p>}
    </div>
  );
}
