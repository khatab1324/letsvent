import { signOut } from "@/auth";
import { db } from "@/lib/db";

export default function SettingPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>sign out</button>
      </form>
      <div className="flex border rounded-lg shadow-lg p-4 h-5/6 w-5/6">
        <div className="w-1/3 border-r pr-4">
          <div className="mb-2">
            <p className="font-bold">welcom</p>
            <p className="text-sm text-gray-600">khatab</p>
          </div>
        </div>
        <div className="w-2/3 pl-4">how what you doning</div>
      </div>
    </main>
  );
}
