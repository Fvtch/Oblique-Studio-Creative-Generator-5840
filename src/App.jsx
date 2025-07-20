import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';

const { FiCopy, FiHeart, FiShare2, FiFilter, FiMoreHorizontal } = FiIcons;

const prompts = {
  disruptive: [
    "Challenge your initial approach",
    "Pursue the opposite direction", 
    "Intentionally create something mundane",
    "Amplify the flaws instead of fixing them",
    "Make it less aesthetically pleasing",
    "Start with a mistake as your foundation",
    "Keep the framework but ignore conventions",
    "Continue until something fails",
    "Embrace chaos as your medium",
    "Break your favorite tool",
    "Misuse every technique",
    "Prioritize the wrong elements",
    "Design for your enemy",
    "Create something that doesn't work",
    "Incorporate a deliberate malfunction",
    "Abandon your strongest skill",
    "Make the background the foreground",
    "Ignore the brief completely",
    "Create without your dominant hand",
    "Eliminate the most important element",
    "Combine incompatible elements",
    "Reject your first five ideas",
    "Use only what you dislike",
    "Sabotage your own work halfway through",
    "Build something to be deliberately misunderstood",
    "Create something that annoys you",
    "Make the worst possible version first",
    "Design something that shouldn't exist",
    "Exaggerate what doesn't matter",
    "Make your process unnecessarily complex"
  ],
  encouraging: [
    "Embrace the recent outcome",
    "Limit yourself to existing resources",
    "Begin from your current position",
    "Go with your instinctive response",
    "Reframe errors as intentional choices",
    "Consider your opponent's approach",
    "Focus on uncomfortable details and emphasize them",
    "Trust the process completely",
    "Amplify what works, discard what doesn't",
    "Imagine this is your final creation",
    "Think like a beginner again",
    "Remember why you started",
    "Honor your initial impulse",
    "Ask what feels natural next",
    "Find beauty in the imperfection",
    "Develop one strong element fully",
    "Consider what excites you most",
    "Reconnect with your original purpose",
    "Let intuition lead for five minutes",
    "Imagine explaining your work to a child",
    "Find the seed of something brilliant",
    "Celebrate the smallest progress",
    "Notice what emerges without effort",
    "Identify what feels resonant",
    "Find inspiration in what you've already done",
    "Follow the energy, not the plan",
    "Discover what's trying to emerge",
    "Appreciate the journey, not just the outcome",
    "Find joy in the smallest detail",
    "See constraints as gifts"
  ],
  minimalist: [
    "Work with absence",
    "Reduce to a single element", 
    "Practice deliberate limitation",
    "Distill to fundamental elements",
    "Identify the bare minimum",
    "Eliminate all but the essential",
    "Value the spaces between",
    "Reduce beyond comfort",
    "Use only one color",
    "Limit yourself to three tools",
    "Create using only negative space",
    "Communicate with the fewest elements possible",
    "Remove until it breaks, then step back once",
    "Subtract rather than add",
    "Honor the white space",
    "Use only what is necessary",
    "Find power in restraint",
    "Embrace emptiness as form",
    "Create with what remains",
    "Simplify until it hurts",
    "Make silence your material",
    "Let absence speak volumes",
    "Find richness in sparsity",
    "Express more with less",
    "Strip away until only truth remains",
    "Value quality over quantity",
    "Create using only two elements",
    "Eliminate the expected elements",
    "Pursue elegant simplicity",
    "Find strength in subtlety"
  ],
  philosophical: [
    "Adopt another persona",
    "Step away and return with fresh perspective",
    "Create then erase",
    "Clarify your underlying message",
    "Identify what's absent",
    "Explore the impact of patience",
    "Examine contrary positions",
    "Invert your perspective",
    "Question your fundamental assumptions",
    "Consider the ethical implications",
    "Explore what this means in a different culture",
    "Ask why this matters deeply",
    "Imagine how this looks in 100 years",
    "Contemplate the opposite of your intention",
    "Question the question itself",
    "Consider your responsibility to the audience",
    "Reflect on what remains unsaid",
    "Examine your true motivation",
    "Ask what this teaches you about yourself",
    "Consider who benefits from this work",
    "Explore the shadow side of your concept",
    "Question whether this serves your values",
    "Consider what's beyond your understanding",
    "Reflect on what you're avoiding",
    "Contemplate what you're truly creating",
    "Examine your relationship to control",
    "Consider what would remain if you weren't here",
    "Ask what deeper truth this points toward",
    "Question the narratives you're perpetuating",
    "Reflect on what this asks of others"
  ],
  experimental: [
    "Collaborate with randomness",
    "Let an algorithm decide",
    "Create a system, then follow its rules",
    "Work in complete darkness for ten minutes",
    "Translate your work into another medium",
    "Incorporate an element of chance",
    "Let someone else make a key decision",
    "Create using only found materials",
    "Build a tool then use it",
    "Work at an unusual scale",
    "Use a technique from a different discipline",
    "Create a constraint, then work within it",
    "Document the process, not the outcome",
    "Let nature complete your work",
    "Create something that changes over time",
    "Involve an unwitting collaborator",
    "Make something ephemeral",
    "Use only tools you've never used before",
    "Create without looking",
    "Work in extreme slow motion",
    "Design for a different species",
    "Make something that destroys itself",
    "Create using only environmental sounds",
    "Design a process, not a product",
    "Make the invisible visible",
    "Create something that only works once",
    "Design for the wrong context",
    "Let weather influence your decisions",
    "Work with what you can't control",
    "Create something that requires participation"
  ]
};

const allPrompts = [
  ...prompts.disruptive, 
  ...prompts.encouraging, 
  ...prompts.minimalist, 
  ...prompts.philosophical,
  ...prompts.experimental
];

function App() {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [filterMode, setFilterMode] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomPrompt = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const promptPool = filterMode === 'all' ? allPrompts : prompts[filterMode];
      const randomIndex = Math.floor(Math.random() * promptPool.length);
      setCurrentPrompt(promptPool[randomIndex]);
      setIsAnimating(false);
    }, 150);
  };

  const copyPrompt = () => {
    if (currentPrompt) {
      navigator.clipboard.writeText(currentPrompt);
    }
  };

  const toggleFavorite = () => {
    if (!currentPrompt) return;
    
    if (favorites.includes(currentPrompt)) {
      setFavorites(favorites.filter(fav => fav !== currentPrompt));
    } else {
      setFavorites([...favorites, currentPrompt]);
    }
  };

  const sharePrompt = async () => {
    if (!currentPrompt) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Creative Studio',
          text: `"${currentPrompt}" — A creative prompt from Creative Studio`,
        });
      } catch (err) {
        copyPrompt();
      }
    } else {
      copyPrompt();
    }
  };

  useEffect(() => {
    getRandomPrompt();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 font-['Inter',system-ui,sans-serif] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50"></div>
      
      {/* Filter Toggle */}
      <motion.button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SafeIcon icon={FiFilter} className="w-5 h-5" />
      </motion.button>

      {/* Filter Menu */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 right-8 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 min-w-[200px]"
          >
            {['all', 'disruptive', 'encouraging', 'minimalist', 'philosophical', 'experimental'].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setFilterMode(mode);
                  setShowFilters(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl mb-2 last:mb-0 transition-colors capitalize ${
                  filterMode === mode 
                    ? 'bg-white/20 text-white' 
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                {mode}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h1 
          className="text-2xl md:text-3xl font-light tracking-wide mb-16 text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Creative Studio
        </motion.h1>

        {/* Prompt Display */}
        <div className="mb-16 min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentPrompt && (
              <motion.div
                key={currentPrompt}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isAnimating ? 0.3 : 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center"
              >
                <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-white max-w-3xl">
                  "{currentPrompt}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Button */}
        <motion.button
          onClick={getRandomPrompt}
          className="group relative px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-xl font-light tracking-wide transition-all duration-300 backdrop-blur-sm mb-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isAnimating}
        >
          <span className="relative z-10">
            {isAnimating ? 'Channeling...' : 'Get Creative Prompt'}
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.button>

        {/* Action Buttons */}
        {currentPrompt && (
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={copyPrompt}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Copy prompt"
            >
              <SafeIcon icon={FiCopy} className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition-colors backdrop-blur-sm border border-white/10 ${
                favorites.includes(currentPrompt)
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={favorites.includes(currentPrompt) ? "Remove from favorites" : "Add to favorites"}
            >
              <SafeIcon icon={FiHeart} className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={sharePrompt}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Share prompt"
            >
              <SafeIcon icon={FiShare2} className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Filter Indicator */}
        {filterMode !== 'all' && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-sm text-gray-500 capitalize tracking-wide">
              {filterMode} prompts
            </span>
          </motion.div>
        )}
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;