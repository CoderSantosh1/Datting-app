"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import ProfileCard, { Profile } from "./ProfileCard";
import {
  MapPin,
  X,
  Volume2,
  CheckCircle,
  MessageCircle,
  Heart,
  Hand,
  Check,
} from "lucide-react";

// 40 Authentic Community Profiles with distances like 150m, 300m, 1.2km, etc.
const initialProfiles: Profile[] = [
  {
    id: "1",
    name: "Leo Rivera",
    age: 26,
    pronouns: "he/him",
    distance: "150m",
    location: "Downtown",
    bio: "Queer architect, espresso enthusiast & ambient music collector. Looking for museum buddies & chill evening walks.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Gay", "Architecture", "Indie Music", "Coffee"],
    vibe: "✨ Creative Soul",
    voiceNoteDuration: "0:14",
  },
  {
    id: "2",
    name: "Kai Chen",
    age: 24,
    pronouns: "they/them",
    distance: "250m",
    location: "Arts District",
    bio: "Non-binary UI designer & synth lover. Always down for boba, queer book clubs, or synthwave jams.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    isNew: true,
    tags: ["Non-Binary", "Design", "Gaming", "Synths"],
    vibe: "🎨 Design & Boba",
    voiceNoteDuration: "0:21",
  },
  {
    id: "3",
    name: "Elena Vance",
    age: 28,
    pronouns: "she/her",
    distance: "380m",
    location: "West End",
    bio: "Trans woman, software engineer, rock climbing addict & proud cat mom. Let's talk sci-fi novels and best brunch spots.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Trans", "Climbing", "Cats", "Tech"],
    vibe: "🧗 Active & Nerdy",
    voiceNoteDuration: "0:18",
  },
  {
    id: "4",
    name: "Samira Patel",
    age: 25,
    pronouns: "she/they",
    distance: "490m",
    location: "Midtown",
    bio: "Bisexual filmmaker & vinyl hunter. Here for thoughtful conversations, drag performances, and spontaneous road trips.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Bisexual", "Cinema", "Vinyl", "Drag"],
    vibe: "🎬 Film & Drag",
  },
  {
    id: "5",
    name: "Marcus Thorne",
    age: 31,
    pronouns: "he/him",
    distance: "620m",
    location: "North Hills",
    bio: "Chef & pottery maker. Loving good natural wine, queer trivia nights, and deep conversations over dinner.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    isNew: true,
    tags: ["Queer", "Culinary", "Pottery", "Wine"],
    vibe: "🍷 Food & Craft",
    voiceNoteDuration: "0:29",
  },
  {
    id: "6",
    name: "Jordan Blake",
    age: 27,
    pronouns: "they/he",
    distance: "750m",
    location: "Southside",
    bio: "Queer photographer and rollerblader. Capturing candid street moments and golden hours. Let's hang at the park!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Photography", "Skate", "Dogs"],
    vibe: "📸 Golden Hour",
    voiceNoteDuration: "0:12",
  },
  {
    id: "7",
    name: "Amari Davis",
    age: 23,
    pronouns: "she/her",
    distance: "890m",
    location: "Riverside",
    bio: "Lesbian poet and plant caretaker. Looking for deep souls, poetry open mics, and peaceful Sunday morning coffee.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    isNew: true,
    tags: ["Lesbian", "Poetry", "Plants", "Matcha"],
    vibe: "🌿 Poetry & Tea",
  },
  {
    id: "8",
    name: "Nico Ramirez",
    age: 29,
    pronouns: "he/they",
    distance: "1.1km",
    location: "Uptown",
    bio: "DJ & community organizer. Hosting queer safe spaces and electronic dance nights. Send track recommendations!",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Queer", "DJ", "Nightlife", "Organizing"],
    vibe: "🎧 Electronic Beats",
    voiceNoteDuration: "0:25",
  },
  {
    id: "9",
    name: "Sasha Gray",
    age: 22,
    pronouns: "they/them",
    distance: "1.2km",
    location: "East Side",
    bio: "Astrology fan, thrifting addict, and indie game streamer. Let's trade Spotify playlists!",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Non-Binary", "Gaming", "Thrifting"],
    vibe: "🔮 Tarot & Games",
  },
  {
    id: "10",
    name: "Rowan Lee",
    age: 26,
    pronouns: "he/him",
    distance: "1.4km",
    location: "Metro Area",
    bio: "Barista by day, baker by night. Always down for late night walks and talking about film photography.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Gay", "Coffee", "Baking"],
    vibe: "☕ Coffee & Warmth",
  },
  {
    id: "11",
    name: "Maya Lin",
    age: 25,
    pronouns: "she/her",
    distance: "1.5km",
    location: "Old Town",
    bio: "Queer illustrator and matcha lover. Drawing comic strips and visiting local botanical gardens.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Queer", "Art", "Matcha"],
    vibe: "🎨 Art & Nature",
    voiceNoteDuration: "0:15",
  },
  {
    id: "12",
    name: "Devon Reed",
    age: 30,
    pronouns: "they/them",
    distance: "1.7km",
    location: "Harbor",
    bio: "Queer marathon runner and dog rescue volunteer. Here for active friends and outdoor adventures.",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Non-Binary", "Running", "Dogs"],
    vibe: "🏃 Active Vibe",
  },
  {
    id: "13",
    name: "Zion Cruz",
    age: 24,
    pronouns: "he/they",
    distance: "1.8km",
    location: "South End",
    bio: "Fashion student & vintage collector. Let's hunt for retro jackets and drink iced lattes.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Fashion", "Vintage"],
    vibe: "✨ Vintage Fits",
  },
  {
    id: "14",
    name: "Aria Thorne",
    age: 27,
    pronouns: "she/they",
    distance: "2.0km",
    location: "Hillcrest",
    bio: "Botanist and acoustic guitar player. Living for farmers markets and quiet evenings with books.",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Lesbian", "Plants", "Acoustic"],
    vibe: "🌿 Plants & Strings",
  },
  {
    id: "15",
    name: "Felix Moreau",
    age: 28,
    pronouns: "he/him",
    distance: "2.1km",
    location: "City Center",
    bio: "French pastry chef living abroad. Looking for genuine connection and people who love good food.",
    avatar: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Gay", "Pastry", "Travel"],
    vibe: "🥐 Bakery Vibe",
  },
  {
    id: "16",
    name: "Chloe Rivers",
    age: 23,
    pronouns: "she/her",
    distance: "2.3km",
    location: "Lakeside",
    bio: "Queer dancer and yoga instructor. Spreading good energy, kindness, and spontaneous laughter.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Dance", "Yoga"],
    vibe: "🧘 Yoga & Peace",
  },
  {
    id: "17",
    name: "Jasper Ward",
    age: 29,
    pronouns: "he/him",
    distance: "2.5km",
    location: "Warehouse District",
    bio: "Woodworker & dog lover. Passionate about sustainable furniture and queer community workshops.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Gay", "Craft", "Woodwork"],
    vibe: "🔨 Wood & Brews",
  },
  {
    id: "18",
    name: "Eden Brooks",
    age: 24,
    pronouns: "they/them",
    distance: "2.7km",
    location: "Greenway",
    bio: "Community organizer, queer zine publisher, and documentary buff. Let's chat over boba tea!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Non-Binary", "Zines", "Film"],
    vibe: "📚 Zines & Cinema",
  },
  {
    id: "19",
    name: "Kiran Shah",
    age: 26,
    pronouns: "he/they",
    distance: "2.9km",
    location: "University Heights",
    bio: "Queer grad student studying marine biology. Diving enthusiast, sci-fi reader & tea lover.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Ocean", "Science"],
    vibe: "🌊 Oceans & Books",
  },
  {
    id: "20",
    name: "Naomi Price",
    age: 25,
    pronouns: "she/her",
    distance: "3.1km",
    location: "East Village",
    bio: "Queer tattoo apprentice and indie music fan. Looking for gigs, thrift finds, and chill nights.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Tattoos", "Indie"],
    vibe: "🖤 Ink & Music",
  },
  {
    id: "21",
    name: "Dante Rossi",
    age: 32,
    pronouns: "he/him",
    distance: "3.3km",
    location: "North End",
    bio: "Architectural photographer and espresso aficionado. Always seeking hidden brutalist architecture.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Gay", "Photo", "Coffee"],
    vibe: "📷 Architecture",
  },
  {
    id: "22",
    name: "Rory Kelly",
    age: 23,
    pronouns: "they/she",
    distance: "3.5km",
    location: "Park Slope",
    bio: "Queer baker and retro video game enthusiast. Mario Kart champion, don't challenge me!",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Gaming", "Baking"],
    vibe: "🎮 Retro Gaming",
  },
  {
    id: "23",
    name: "Lucian Diaz",
    age: 28,
    pronouns: "he/him",
    distance: "3.7km",
    location: "Market Square",
    bio: "Florist and interior stylist. Transforming spaces with greenery and warm mood lighting.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: false,
    tags: ["Gay", "Florals", "Decor"],
    vibe: "🌸 Flowers & Style",
  },
  {
    id: "24",
    name: "Talia Miller",
    age: 27,
    pronouns: "she/her",
    distance: "3.9km",
    location: "Canal District",
    bio: "Standup comedian & queer podcast host. Laughing through life and seeking thoughtful banter.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Lesbian", "Comedy", "Podcast"],
    vibe: "🎙️ Laughs & Banter",
  },
  {
    id: "25",
    name: "Eliot Vance",
    age: 26,
    pronouns: "he/they",
    distance: "4.1km",
    location: "Highland",
    bio: "Ceramics artist and vinyl DJ. Creating handmade mugs and spinning house music on weekends.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Ceramics", "House Music"],
    vibe: "🎧 Mugs & Beats",
  },
  {
    id: "26",
    name: "Skylar Wu",
    age: 24,
    pronouns: "they/them",
    distance: "4.3km",
    location: "Chinatown",
    bio: "Non-binary animator and dumpling hunter. Love animated films and night market strolls.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Non-Binary", "Animation", "Food"],
    vibe: "🍜 Food & Toons",
  },
  {
    id: "27",
    name: "Mateo Ortiz",
    age: 30,
    pronouns: "he/him",
    distance: "4.5km",
    location: "Westside",
    bio: "Bilingual community lawyer and salsa dancer. Passionate about human rights and great dinner parties.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Gay", "Justice", "Dance"],
    vibe: "⚖️ Heart & Salsa",
  },
  {
    id: "28",
    name: "Gia Fontaine",
    age: 29,
    pronouns: "she/her",
    distance: "4.8km",
    location: "The Boulevard",
    bio: "Trans drag performer and makeup artist. Spreading glamour, sisterhood, and high energy everywhere.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Trans", "Drag", "Makeup"],
    vibe: "👑 Glamour & Joy",
  },
  {
    id: "29",
    name: "Remi Laurent",
    age: 25,
    pronouns: "they/he",
    distance: "5.0km",
    location: "Old Harbor",
    bio: "Sailor and ocean conservationist. Love being near the water and listening to acoustic indie folk.",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Sailing", "Indie Folk"],
    vibe: "⛵ Salt & Acoustic",
  },
  {
    id: "30",
    name: "Zara Ahmed",
    age: 23,
    pronouns: "she/they",
    distance: "5.2km",
    location: "South Gate",
    bio: "Poet and barista. Chai lover, feminist literature collector, and Sunday museum wanderer.",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Bisexual", "Poetry", "Museums"],
    vibe: "☕ Chai & Poetry",
  },
  {
    id: "31",
    name: "Tobias Meyer",
    age: 28,
    pronouns: "he/him",
    distance: "5.5km",
    location: "Sunset District",
    bio: "Cybersecurity analyst & synthesizer builder. Into electronic glitch music and cold brew coffee.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Gay", "Tech", "Synths"],
    vibe: "⚡ Code & Synths",
  },
  {
    id: "32",
    name: "Quinn Harper",
    age: 24,
    pronouns: "they/them",
    distance: "5.8km",
    location: "Midwood",
    bio: "Non-binary florist and plant propagator. Bringing joy one monstera leaf at a time.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Non-Binary", "Plants", "Nature"],
    vibe: "🌿 Greenery Vibe",
  },
  {
    id: "33",
    name: "Lucas Sterling",
    age: 31,
    pronouns: "he/him",
    distance: "6.1km",
    location: "Bayview",
    bio: "Bicycle mechanic & long distance gravel rider. Let's explore scenic city bike trails together.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Gay", "Cycling", "Gravel"],
    vibe: "🚴 Bikes & Trails",
  },
  {
    id: "34",
    name: "Sienna Bell",
    age: 26,
    pronouns: "she/her",
    distance: "6.4km",
    location: "Oakridge",
    bio: "Queer fashion stylist & thrifter. Big lover of bold colors, 90s aesthetic, and live music.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Fashion", "Live Music"],
    vibe: "🎨 90s Aesthetic",
  },
  {
    id: "35",
    name: "Miles Tanaka",
    age: 27,
    pronouns: "he/they",
    distance: "6.7km",
    location: "Crossroads",
    bio: "Japanese-American ceramicist and tea ceremony practitioner. Appreciating stillness and mindful moments.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Queer", "Tea", "Ceramics"],
    vibe: "🍵 Calm & Mindful",
  },
  {
    id: "36",
    name: "Bree Olsen",
    age: 22,
    pronouns: "she/her",
    distance: "7.0km",
    location: "College Park",
    bio: "Queer sociology student and environmental activist. Fighting for climate justice with chosen family.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Lesbian", "Activism", "Books"],
    vibe: "🌍 Green Justice",
  },
  {
    id: "37",
    name: "Julian Cross",
    age: 29,
    pronouns: "he/him",
    distance: "7.3km",
    location: "North Point",
    bio: "Bartender & cocktail creator. Crafting queer-themed cocktails and natural syrups. Cheers to good vibes!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Gay", "Mixology", "Cocktails"],
    vibe: "🍸 Craft Spirits",
  },
  {
    id: "38",
    name: "Piper Flynn",
    age: 25,
    pronouns: "they/them",
    distance: "7.6km",
    location: "The Glades",
    bio: "Non-binary sound designer for indie games. Love lo-fi beats, synth textures, and cozy rainy afternoons.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: false,
    tags: ["Non-Binary", "Audio", "Indie Games"],
    vibe: "🎧 Lo-Fi Beats",
  },
  {
    id: "39",
    name: "Andre Mercer",
    age: 33,
    pronouns: "he/him",
    distance: "8.1km",
    location: "Uptown Plaza",
    bio: "Graphic designer, jazz collector, and French bulldog dad. Seeking sincere connection and laughter.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80",
    isOnline: false,
    isVerified: true,
    tags: ["Gay", "Jazz", "Design"],
    vibe: "🎷 Jazz & Coffee",
  },
  {
    id: "40",
    name: "Wren Navarro",
    age: 24,
    pronouns: "they/them",
    distance: "8.5km",
    location: "High Ridge",
    bio: "Transmasc climber & barista. Always ready for outdoor bouldering trips, campfire chats, and stargazing.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
    isOnline: true,
    isVerified: true,
    tags: ["Trans", "Climbing", "Outdoors"],
    vibe: "🧗 Mountains & Fire",
    voiceNoteDuration: "0:20",
  },
];

const emptySubscribe = () => () => {};

export default function NearbyPeople() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [modalLiked, setModalLiked] = useState(false);
  const [modalWaved, setModalWaved] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const modalOpenTimeRef = useRef<number>(0);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const filteredProfiles = initialProfiles;

  const handleOpenModal = (profile: Profile) => {
    modalOpenTimeRef.current = Date.now();
    setSelectedProfile(profile);
    setModalLiked(false);
    setModalWaved(false);
    setIsPlayingVoice(false);
  };

  const handleBackdropDismiss = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    // Guard against 300ms mobile Chrome ghost-click from card tap
    if (Date.now() - modalOpenTimeRef.current < 450) {
      return;
    }
    setSelectedProfile(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProfile(null);
      }
    };
    if (selectedProfile) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProfile]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMessageText("");
    }, 2500);
  };

  const handleModalWave = () => {
    setModalWaved(true);
    setTimeout(() => setModalWaved(false), 2500);
  };

  return (
    <section id="nearby" className="relative pt-2 pb-6">
      <div className="w-full px-2">
        {/* 4 IMAGES PER LINE (Strict 4-Column Mobile Grid - 40 Profiles) */}
        <div className="grid grid-cols-4 gap-1.5">
          {filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </div>

      {/* FULL USER DETAILS MODAL (Mounted directly to body via portal for mobile stability) */}
      {mounted && selectedProfile && typeof document !== "undefined"
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProfile.name}'s profile details`}
              className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 touch-manipulation overscroll-contain"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                zIndex: 99999,
              }}
            >
              {/* Dark backdrop overlay */}
              <div
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                onClick={handleBackdropDismiss}
                onTouchEnd={handleBackdropDismiss}
              />

              {/* Modal sheet card */}
              <div
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                className="relative z-10 flex w-full max-w-md max-h-[88dvh] sm:max-h-[90vh] flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border border-[var(--border-strong)] bg-[var(--modal-bg)] text-[var(--text-primary)] shadow-2xl overscroll-contain transition-colors"
              >
                {/* Close Button Top Right */}
                <button
                  type="button"
                  aria-label="Close profile details"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProfile(null);
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    setSelectedProfile(null);
                  }}
                  className="absolute right-3.5 top-3.5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-md border border-white/25 active:bg-white/20"
                >
                  <X size={20} />
                </button>

                {/* Modal Image Header */}
                <div className="relative aspect-[4/3] w-full bg-zinc-900 shrink-0">
                  <Image
                    src={selectedProfile.avatar}
                    alt={selectedProfile.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xl font-black text-white">
                          {selectedProfile.name}, {selectedProfile.age}
                        </h3>
                        {selectedProfile.isVerified && (
                          <span
                            title="Verified Safe Profile"
                            className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-black"
                          >
                            <CheckCircle size={11} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/90 mt-0.5">
                        <span className="rounded bg-fuchsia-500/40 px-1.5 py-0.2 font-semibold text-fuchsia-200">
                          {selectedProfile.pronouns}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-fuchsia-400" />
                          {selectedProfile.distance} ({selectedProfile.location})
                        </span>
                      </div>
                    </div>

                    {selectedProfile.isOnline && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                        Online
                      </span>
                    )}
                  </div>
                </div>

                {/* Full User Details Content Body */}
                <div className="flex flex-col gap-3 p-4 overflow-y-auto max-h-[55vh]">
                  {/* Vibe & Voice Note */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/15 px-2.5 py-0.5 text-xs font-bold text-fuchsia-500">
                      {selectedProfile.vibe}
                    </span>

                    {selectedProfile.voiceNoteDuration && (
                      <button
                        type="button"
                        onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                        className="flex items-center gap-1.5 rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-500 transition hover:bg-cyan-500/20 active:scale-95"
                      >
                        <Volume2
                          size={13}
                          className={isPlayingVoice ? "animate-pulse text-cyan-400" : ""}
                        />
                        <span>
                          {isPlayingVoice
                            ? "Playing Voice Note..."
                            : `Voice Intro (${selectedProfile.voiceNoteDuration})`}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* About Me / Bio */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      About Me
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-primary)]">
                      {selectedProfile.bio}
                    </p>
                  </div>

                  {/* What I'm Looking For */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Looking For
                    </h4>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      Dates, new queer friends, coffee chats & live voice hangouts.
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Interests & Identity
                    </h4>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {selectedProfile.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--badge-bg)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Wave & Like */}
                  <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-subtle)]">
                    <button
                      type="button"
                      onClick={handleModalWave}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--badge-bg)] py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-fuchsia-500/10 hover:text-fuchsia-500 active:scale-95"
                    >
                      {modalWaved ? (
                        <Check size={14} className="text-emerald-500" />
                      ) : (
                        <Hand size={14} className="text-amber-400" />
                      )}
                      <span>{modalWaved ? "Waved! 👋" : "Send Wave 👋"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalLiked(!modalLiked)}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition active:scale-95 ${
                        modalLiked
                          ? "border-rose-500 bg-rose-500/20 text-rose-500"
                          : "border-[var(--border-subtle)] bg-[var(--badge-bg)] text-[var(--text-muted)] hover:text-rose-500"
                      }`}
                    >
                      <Heart size={16} className={modalLiked ? "fill-rose-500 text-rose-500" : ""} />
                    </button>
                  </div>

                  {/* Direct Message Input Box */}
                  <form onSubmit={handleSendMessage} className="flex flex-col gap-1.5">
                    <div className="relative">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder={`Message ${selectedProfile.name.split(" ")[0]}...`}
                        className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] py-2.5 pl-3 pr-10 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-fuchsia-400"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md active:scale-90"
                      >
                        <MessageCircle size={14} />
                      </button>
                    </div>
                    {messageSent && (
                      <p className="text-center text-[11px] font-semibold text-emerald-500">
                        ✓ Message sent to {selectedProfile.name}!
                      </p>
                    )}
                  </form>

                  {/* Bottom Close Button for easy one-thumb reach */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProfile(null);
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      setSelectedProfile(null);
                    }}
                    className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--badge-bg)] py-3 text-center text-sm font-semibold text-[var(--text-primary)] transition active:bg-[var(--border-subtle)]"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
