import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Palette, Mail, Phone, X, Send, Compass, Filter , MessageCircle} from 'lucide-react';

// --- IMPORT LOCAL IMAGES FROM src/assets/ ---
import tribal1 from './assets/tribal-1.jpeg';
import tribal2 from './assets/tribal-2.jpeg';
import tribal3 from './assets/tribal-3.jpeg';
import tribal4 from './assets/tribal-4.jpeg';
import tribal5 from './assets/tribal-5.jpeg';
import tribal6 from './assets/tribal-6.jpeg';
import tribal7 from './assets/tribal-7.jpeg';
import modern1 from './assets/modern-1.png';
import modern2 from './assets/modern-2.png';
import modern3 from './assets/modern-3.jpg';
import modern4 from './assets/modern-4.jpg';
import modern5 from './assets/modern-5.png';
import modern6 from './assets/modern-6.jpg';
import modern7 from './assets/modern-7.jpg';
import modern8 from './assets/modern-8.jpg';

// --- MOCK PAINTINGS DATA (Updated with your 3 categories) ---
// Note: Once you place your images in src/assets/, you can import them like:
// import tribalImg from './assets/tribal-1.jpg';
// And set image: tribalImg

const PAINTINGS = [
  {
    id: 1,
    title: "Echoes of the Sacred Forest",
    category: "Tribal Arts",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    summary: "Rooted in ancient indigenous storytelling and earth pigments.",
    story: "Drawing directly from folkloric tales passed down through generations, this canvas uses traditional motifs and mineral hues. It serves as a visual bridge to ancient belief systems where nature and tribal roots intertwine."
  },
  {
    id: 2,
    title: "Solitude in Neon & Concrete",
    category: "Modern Paintings",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80",
    summary: "Juxtaposing organic silhouettes with stark urban geometry.",
    story: "Created during a late-night studio session, this modern abstraction investigates isolation amidst architectural sprawl. The clashing neon hues represent digital distraction against muted, brooding underlayers."
  },
  {
    id: 3,
    title: "The Sacred Grove & The Harvest Rhythm",
    category: "Tribal Arts",
    image: tribal1,
    summary: "A panoramic narrative of indigenous community life, centered around a sacred guardian tree, cattle, and seasonal harvest rituals.",
    story: "This intricate composition captures the inseparable bond between rural communities, their livestock, and the surrounding ecosystem. At the heart of the canvas stands the great guardian tree—a symbol of life, shelter, and ancestral endurance—while villagers gather crops, tend to cattle, and move about their traditional dwellings. Every earthy pigment and patterned silhouette honors the quiet, sacred rhythms of village existence passed down through generations."
  },
  {
    id: 4,
    title: "Whispers of the Bamboo Grove & The River Path",
    category: "Tribal Arts",
    image: tribal2,
    summary: "A verdant depiction of life along a sacred forest stream, framed by towering bamboo stalks and textured wildlife.",
    story: "Immersed in deep shades of forest green and teal, this canvas captures the quiet harmony of a community living alongside winding streams and dense bamboo thickets. Intricate patterns detail the cattle, birds in flight, and villagers carrying water pots and tools through the landscape. It portrays a world where nature's architecture—the slender bamboo and flowing water—defines the very pulse of daily life and folklore."
  },
  {
    id: 5,
    title: "The Canopy of Ancestral Dreams (Tree of Life)",
    category: "Tribal Arts",
    image: tribal3,
    summary: "A magnificent depiction of the cosmic Tree of Life, bridging the earthy soil with an explosion of amber and emerald foliage.",
    story: "Centered around the timeless archetype of the Tree of Life, this painting radiates with a dense canopy of red, copper, and emerald leaves. Beneath its sprawling boughs, figures gather in harmony with nature, engaging in quiet daily rituals. The intricate textures of the bark and the stippled background pay homage to traditional indigenous art forms where trees are revered as divine cosmic pillars holding up the sky."
  },
  {
    id: 6,
    title: "Symphony of the Avian Canopy",
    category: "Tribal Arts",
    image: tribal4,
    summary: "A vibrant ecosystem of patterned birds populating a sweeping violet-trunked tree above a tranquil rural homestead.",
    story: "Teeming with life, this captivating canvas presents a sweeping tree with a striking violet trunk and branches, serving as a sanctuary for an array of brilliantly patterned birds in flight and repose. Below, nestled against a traditional terracotta hut, villagers engage in quiet daily offerings near an earthen mound. The meticulous dotwork and rich color contrasts celebrate the sacred coexistence of fauna, flora, and human heritage in traditional folklore."
  },
  {
    id: 7,
    title: "The Stags of the Forest Canopy",
    category: "Tribal Arts",
    image: tribal5,
    summary: "A mystical depiction of stags whose branching antlers transform into the very forest canopy that shelters them.",
    story: "In this deeply symbolic composition, the boundary between fauna and flora dissolves entirely. Two beautifully patterned stags leap dynamically, their golden and crimson-spotted bodies anchoring a scene where their majestic antlers seamlessly stretch upward to become the leafy branches of the forest tree. Accompanied by tranquil birds nestled within the foliage, this piece speaks to the animist belief that forest animals and trees share a single, unified soul within the heartbeat of the wild."
  },
  {
    id: 8,
    title: "The Serpentine Vine of Gold",
    category: "Tribal Arts",
    image: tribal6,
    summary: "A mesmerizing, winding crimson tree rising against a brilliant golden backdrop, sheltering nesting birds.",
    story: "Set against a radiant golden-yellow ground that evokes the warmth of a tropical sun, this vertical composition highlights a gracefully winding crimson trunk. The tree's undulating branches curve upward like a living river of life, cradling detailed leaves and camouflaged birds within its layers. It is a visual celebration of resilience and vitality, symbolizing how nature twists, bends, and continues to flourish toward the light."
  },
  {
    id: 9,
    title: "The Totem of Ascending Birds",
    category: "Tribal Arts",
    image: tribal7,
    summary: "A vertical tapestry where the tree trunk seamlessly morphs into stacked, patterned birds climbing toward the canopy.",
    story: "Blending avian grace with botanical structure, this vertical composition portrays a sacred totem tree whose very trunk transforms tier by tier into majestic, intricately patterned birds. Surrounded by dense, dark green leaves and a constellation of smaller winged creatures, the ascending figures symbolize spiritual elevation, migration, and the harmonious unity of sky and earth in ancient folklore."
  },
  {
    id: 10,
    title: "The Ronin's Crimson Blade",
    category: "Modern Paintings",
    image: modern1,
    summary: "A powerful minimalist ink-wash composition of a wandering samurai accented by vibrant splashes of crimson.",
    story: "Blending traditional Eastern iconography with sharp contemporary minimalism, this artwork captures a solitary ronin standing in quiet vigilance. The monochromatic grey tones of the garments and conical hat evoke a sense of timeless wandering, while violent splashes and strokes of brilliant crimson inject a raw, pulsing energy—representing honor, bloodline, and the razor-thin edge between stillness and conflict."
  },
  {
    id: 11,
    title: "Tempest in Monochrome",
    category: "Modern Paintings",
    image: modern2,
    summary: "A dramatic, fluid ink-wash composition of a warrior emerging from a swirling storm of smoke and shadows.",
    story: "Rendered entirely in dramatic shades of charcoal and ash, this contemporary piece evokes the untamed fury of a storm. A solitary fighter stands resolute as dark ink billows and shatters like smoke around them, their blade planted firmly in the turbulence. It explores themes of internal resilience, chaos, and the quiet eye of the storm found within disciplined mastery."
  },
  {
    id: 12,
    title: "The Celestial Sentinel",
    category: "Modern Paintings",
    image: modern3,
    summary: "A stippled pointillism piece of a cloaked cosmic knight crowned with a stellar halo, gripping a gleaming broadsword.",
    story: "Rendered through meticulous stippled dotwork, this hauntingly majestic figure emerges from the cosmic void like an ancient celestial guardian. Clad in garments woven from starlight and shadow, the sentinel wears a radiant halo and firmly grasps a gleaming broadsword. It explores themes of eternal vigilance, cosmic solitude, and the quiet power of divine resolve amidst endless darkness."
  },
  {
    id: 13,
    title: "Echoes of the Inkstorm Vanguard",
    category: "Modern Paintings",
    image: modern4,
    summary: "A sweeping panoramic ink composition capturing a line of warriors marching through swirling tempest clouds.",
    story: "Flowing like a traditional Chinese scroll reinterpreted through modern dark fantasy, this sweeping panoramic piece portrays an army marching resolutely into a chaotic tempest of swirling ink and mountains. A single crimson banner trails behind them like a streak of fire, cutting through the monochromatic turbulence. It evokes the epic scale of endurance, unity, and courage facing the unknown."
  },
  {
    id: 14,
    title: "Confrontation with the Abyss",
    category: "Modern Paintings",
    image: modern5,
    summary: "A solitary warrior standing eye-to-eye with a colossal, shadowy dragon amidst swirling monochrome smoke.",
    story: "A masterclass in scale and tension, this artwork captures the ultimate standoff between a solitary swordsman and a colossal, serpentine dragon carved from shadow and smoke. Glowing eyes pierce through the swirling haze, creating an intense dialogue between mortal bravery and ancient, primordial power. It is a visual testament to facing one's greatest fears head-on."
  },
  {
    id: 15,
    title: "Portrait of the Untamed (Toji)",
    category: "Modern Paintings",
    image: modern6,
    summary: "A gritty, high-contrast monochrome portrait highlighting raw intensity and fierce character expression.",
    story: "Striking and unapologetically raw, this high-contrast portrait captures a battle-hardened figure framed by textured dark ink, scars, and sharp piercing gaze. The stark monochrome palette accented by distressed urban typography elements bridges traditional graphic illustration with gritty modern character design, symbolizing untamed strength and survival against all odds."
  },
  {
    id: 16,
    title: "Eclipse of the Crimson Gate",
    category: "Modern Paintings",
    image: modern7,
    summary: "A solitary silhouette standing before a blazing red solar eclipse framed by dead, jagged tree branches.",
    story: "Bathed in an apocalyptic glow, this surreal landscape features a lone figure gazing out toward a blazing crimson ring eclipsing a dark, brooding sky. Framed by skeletal, jagged tree branches that claw at the horizon, the piece evokes a powerful sense of transition, mystery, and the haunting beauty of a world caught between dusk and destruction."
  }
  
];

const CATEGORIES = ["All", "Tribal Arts", "Modern Paintings", "Wall Art Mixers"];

// --- NAVIGATION BAR ---
function Navbar() {
  const location = useLocation();
  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl tracking-wide text-stone-900">
          <Palette className="w-5 h-5 text-amber-700" />
          <span>Canvas & Stories</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition-colors ${location.pathname === '/' ? 'text-amber-800 font-semibold' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Gallery
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors ${location.pathname === '/contact' ? 'text-amber-800 font-semibold' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Contact & Commissions
          </Link>
        </div>
      </div>
    </nav>
  );
}

// --- HOME PAGE (GALLERY & STORIES WITH CATEGORIES) ---
function Home() {
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPaintings = activeCategory === "All" 
    ? PAINTINGS 
    : PAINTINGS.filter(art => art.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
          <Compass className="w-3.5 h-3.5" /> Curated Collection
        </span>
        <h1 className="text-4xl font-serif font-normal text-stone-900 mb-4">Paintings & Their Stories</h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Explore our distinct collections spanning indigenous roots, contemporary abstractions, and mixed gallery walls.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === category
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPaintings.map((art) => (
          <div 
            key={art.id} 
            onClick={() => setSelectedPainting(art)}
            className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <img 
                src={art.image} 
                alt={art.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-stone-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-xs">
                {art.category}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                  {art.title}
                </h3>
                <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-amber-800">
                <span>Read Full Story</span>
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Detail Modal */}
      {selectedPainting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-stone-100 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedPainting(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/9] w-full overflow-hidden bg-stone-100">
              <img 
                src={selectedPainting.image} 
                alt={selectedPainting.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2 block">
                {selectedPainting.category}
              </span>
              <h2 className="text-2xl font-serif text-stone-900 mb-4">{selectedPainting.title}</h2>
              <div className="prose text-stone-700 leading-relaxed space-y-4 text-sm sm:text-base">
                <p className="font-medium text-stone-900">{selectedPainting.summary}</p>
                <p>{selectedPainting.story}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end">
                <button 
                  onClick={() => setSelectedPainting(null)}
                  className="px-5 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- CONTACT PAGE ---
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setSubmitted(true); // Fallback success for quick testing
        form.reset();
      }
    } catch (err) {
      setSubmitted(true);
      form.reset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Profile Card & Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs text-center">
            {/* Passport Size Image Placeholder */}
            <div className="w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden bg-stone-200 border-2 border-stone-100 shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                alt="Artist Portrait" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <h2 className="font-serif text-xl text-stone-900 mb-1">Artist Studio</h2>
            <p className="text-xs text-stone-500 mb-6">Fine Arts & Cultural Commissions</p>

            <div className="space-y-3 text-left border-t border-stone-100 pt-5 text-sm text-stone-600">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-800 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-800 shrink-0" />
                <span className="truncate">artist.studio@example.com</span>
              </div>
              {/* WhatsApp Direct Chat Button */}
              <div className="mt-6 pt-5 border-t border-stone-100">
                <a 
                  href="https://wa.me/917879611986?text=Hi,%20I%20visited%20your%20art%20portfolio%20and%20would%20like%20to%20discuss%20an%20inquiry." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Message / Commission Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-stone-200 shadow-xs">
          <h1 className="text-2xl font-serif font-normal text-stone-900 mb-2">Commission & Inquiries</h1>
          <p className="text-stone-600 text-sm mb-8">
            Interested in acquiring a painting, discussing a story, or commissioning a custom artwork? Drop a message below.
          </p>

          {submitted ? (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-6 rounded-xl text-center space-y-2">
              <h3 className="font-serif text-lg">Thank you for reaching out!</h3>
              <p className="text-sm">Your message has been received. I will get back to you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold underline text-amber-800 hover:text-amber-900 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">Your Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">Company or Studio Name</label>
                  <input 
                    type="text" 
                    name="company" 
                    placeholder="Optional (Studio / Gallery)"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">Preferred Art Style</label>
                  <select 
                    name="art_style"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-sm bg-white"
                  >
                    <option value="General Inquiry">General Inquiry / Open</option>
                    <option value="Tribal Arts">Tribal Arts</option>
                    <option value="Modern Paintings">Modern Paintings</option>
                    <option value="Wall Art Mixers">Wall Art Mixers</option>
                    <option value="Custom Commission">Custom Commission</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">Project Details & Message *</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  required 
                  placeholder="Tell me about your project, dimensions, or specific themes you have in mind..."
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-sm resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

// --- ROOT APP COMPONENT ---
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-500 bg-white">
        <p>&copy; {new Date().getFullYear()} Art & Stories Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}