const stats = [
  { value: '500+', label: 'Installations réalisées' },
  { value: '10+', label: 'Années d\'expérience' },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '24/7', label: 'Support technique' },
]

export default function StatsSection() {
  return (
    <section className="bg-[#B83232] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-red-100 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
