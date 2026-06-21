export default function Footer(){
  return (
    <footer className="mt-16 bg-slate-900 text-white rounded-lg p-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold">Mama's Crafts</h4>
          <p className="text-sm text-slate-300 mt-2">Creating a life of freedom, creativity, and deep connection with our children.</p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="text-sm text-slate-300 mt-2 space-y-1">
            <li>About</li>
            <li>Shop</li>
            <li>Workshops</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Stay Connected</h4>
          <p className="text-sm text-slate-300 mt-2">Join our email list for inspiration, discounts, and monthly moon letters.</p>
          <div className="mt-3 flex">
            <input className="rounded-l px-3 py-2 text-slate-900" placeholder="Email" />
            <button className="bg-rose-300 text-rose-900 px-3 py-2 rounded-r">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-slate-400">© 2026 Mama's Crafts Collective</div>
    </footer>
  )
}
