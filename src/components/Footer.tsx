export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8 text-sm text-slate-400">
      <div className="mx-auto max-w-6xl">
        © {new Date().getFullYear()} CloudBridge. Sample data for demonstration only.
      </div>
    </footer>
  );
}