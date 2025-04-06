import Link from 'next/link'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        <ExclamationCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Oops! Pagina non trovata</h2>
        <p className="text-gray-600 mt-2">La risorsa richiesta deve essere ancora sviluppata🚧.</p>
        <Link href="/" className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700 transition">
          Torna alla Home
        </Link>
      </div>
    </div>
  )
}
