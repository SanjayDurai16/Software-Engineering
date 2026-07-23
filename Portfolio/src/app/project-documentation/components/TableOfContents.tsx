'use client';


const tocItems = [
  { num: '01', label: 'Overview' },
  { num: '02', label: 'Architecture' },
  { num: '03', label: 'Workflow' },
  { num: '04', label: 'Database' },
  { num: '05', label: 'RBAC' },
  { num: '06', label: 'Pricing' },
  { num: '07', label: 'SE Docs' },
  { num: '08', label: 'Future Scope' },
];

export default function TableOfContents() {
  const handleClick = (num: string) => {
    const sections = document.querySelectorAll('section');
    const idx = parseInt(num) - 1;
    if (sections[idx]) {
      sections[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="border-b border-border bg-background sticky top-14 z-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {tocItems.map((item) => (
            <button
              key={item.num}
              onClick={() => handleClick(item.num)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <span className="font-mono text-primary/60">{item.num}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
