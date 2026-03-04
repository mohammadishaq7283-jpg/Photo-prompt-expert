// app/page.tsx
import { redirect } from 'next/navigation';

// Yeh file user ko foran English homepage par bhej degi
export default function RootPage() {
  redirect('/en');
}
