import stringHash from 'string-hash';

const ASDF = [
  'bg-gray-200',
  'bg-zinc-200',
  'bg-neutral-200',
  'bg-stone-200',
  'bg-red-200',
  'bg-orange-200',
  'bg-amber-200',
  'bg-yellow-200',
  'bg-lime-200',
  'bg-green-200',
  'bg-emerald-200',
  'bg-teal-200',
  'bg-cyan-200',
  'bg-sky-200',
  'bg-blue-200',
  'bg-indigo-200',
  'bg-violet-200',
  'bg-purple-200',
  'bg-fuchsia-200',
  'bg-pink-200',

  'bg-gray-400',
  'bg-zinc-400',
  'bg-neutral-400',
  'bg-stone-400',
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-yellow-400',
  'bg-lime-400',
  'bg-green-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-sky-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-fuchsia-400',
  'bg-pink-400',

  'bg-gray-600',
  'bg-zinc-600',
  'bg-neutral-600',
  'bg-stone-600',
  'bg-red-600',
  'bg-orange-600',
  'bg-amber-600',
  'bg-yellow-600',
  'bg-lime-600',
  'bg-green-600',
  'bg-emerald-600',
  'bg-teal-600',
  'bg-cyan-600',
  'bg-sky-600',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-violet-600',
  'bg-purple-600',
  'bg-fuchsia-600',
  'bg-pink-600',

  'bg-gray-800',
  'bg-zinc-800',
  'bg-neutral-800',
  'bg-stone-800',
  'bg-red-800',
  'bg-orange-800',
  'bg-amber-800',
  'bg-yellow-800',
  'bg-lime-800',
  'bg-green-800',
  'bg-emerald-800',
  'bg-teal-800',
  'bg-cyan-800',
  'bg-sky-800',
  'bg-blue-800',
  'bg-indigo-800',
  'bg-violet-800',
  'bg-purple-800',
  'bg-fuchsia-800',
  'bg-pink-800',
];

const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
];

const saturations = [200, 400, 600, 800];

function stringToIconClassName(str) {
  const hash = stringHash(str);

  const color = colors[hash % colors.length];
  const saturation = saturations[hash % saturations.length];
  const textClass = saturation >= 400 ? 'text-white' : 'text-black';

  return `${textClass} bg-${color}-${saturation}`;
}

export default stringToIconClassName;
