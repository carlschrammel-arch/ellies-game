import { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Card } from '../types';
import { useSettings } from '../context/SettingsContext';

interface SwipeCardProps {
  card: Card;
  onSwipe: (liked: boolean) => void;
  onSkip: () => void;
  onInfoRequest: () => void;
  isTop: boolean;
  index: number;
}

export function SwipeCard({ card, onSwipe, onSkip, onInfoRequest, isTop, index }: SwipeCardProps) {
  const { settings } = useSettings();
  const [exitX, setExitX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  // Scale based on position in stack
  const scale = isTop ? 1 : 0.95 - index * 0.03;
  const yOffset = isTop ? 0 : index * 8;

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const threshold = 100;

      if (info.offset.x > threshold) {
        setExitX(500);
        onSwipe(true);
      } else if (info.offset.x < -threshold) {
        setExitX(-500);
        onSwipe(false);
      }
    },
    [onSwipe]
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  // Get the emoji and colors from card icon, with fallback
  const cardEmoji = card.icon?.icon || '❓';
  const bgColor = card.icon?.bgColor || '#F3F4F6';

  return (
    <motion.div
      className="absolute w-full h-full"
      style={{
        x,
        rotate: settings.reducedMotion ? 0 : rotate,
        scale,
        y: yOffset,
        zIndex: 100 - index,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{
        scale,
        opacity: isTop ? 1 : 0.8 - index * 0.15,
        y: yOffset,
        x: exitX,
      }}
      exit={{
        x: exitX,
        opacity: 0,
        transition: { duration: settings.reducedMotion ? 0 : 0.3 },
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      whileTap={isTop ? { scale: 1.02 } : {}}
    >
      <div
        className={`relative w-full h-full rounded-4xl shadow-card overflow-hidden select-none ${
          isTop && isDragging ? 'cursor-grabbing' : isTop ? 'cursor-grab' : ''
        }`}
        style={{ backgroundColor: bgColor }}
      >
        {/* Large emoji display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[120px] md:text-[160px] select-none drop-shadow-lg">
            {cardEmoji}
          </span>
        </div>

        {/* "LOVE IT" stamp */}
        <motion.div
          className="stamp stamp-love"
          style={{ opacity: likeOpacity }}
        >
          Love it! 💚
        </motion.div>

        {/* "NOPE" stamp */}
        <motion.div
          className="stamp stamp-nope"
          style={{ opacity: nopeOpacity }}
        >
          Nope 👋
        </motion.div>

        {/* Card label at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white drop-shadow-lg text-center">
            {card.label}
          </h3>
        </div>

        {/* Swipe hint for top card */}
        {isTop && !isDragging && (
          <motion.div
            className="absolute top-4 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">
              👈 Swipe or use buttons 👉
            </span>
          </motion.div>
        )}

        {/* Action buttons (only show on top card) */}
        {isTop && !isDragging && (
          <div className="absolute top-4 right-4 flex gap-2">
            {/* What is this? button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onInfoRequest();
              }}
              className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="What is this?"
            >
              <span className="text-lg">❓</span>
            </motion.button>

            {/* Skip button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onSkip();
              }}
              className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Skip this card"
            >
              <span className="text-lg">⏭️</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
