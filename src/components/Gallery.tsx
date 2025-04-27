import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ModalContext } from '../App';

const GalleryContainer = styled(motion.section)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-md);

  @media (max-width: 768px) {
    padding: var(--spacing-sm);
  }
`;

// 
interface ImageCardProps {
  height?: string;
}

const ImageCard = styled(motion.div)<ImageCardProps>`
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  aspect-ratio: 1;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    border-radius: var(--border-radius-md);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
`;

const ImageCaption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-md);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;

  ${ImageCard}:hover & {
    transform: translateY(0);
  }
`;

const ModalContent = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  cursor: default;
  overflow: hidden;
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ModalImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  cursor: grab;

  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 85vh;
    border-radius: var(--border-radius-md);
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  z-index: 100002;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.2);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NavigationArrow = styled(motion.button)<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.left ? 'left: var(--spacing-md);' : 'right: var(--spacing-md);'}
  background: rgba(255, 255, 255, 0.15);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  touch-action: manipulation;
  z-index: 100001;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    display: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: var(--spacing-md);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 100001;
  
  @media (max-width: 768px) {
    bottom: var(--spacing-sm);
  }
`;

const DotIndicator = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
    margin: 0 2px;
  }
  
  &:hover {
    transform: scale(1.2);
    background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  }
`;

const SwipeHint = styled(motion.div)`
  position: absolute;
  bottom: 120px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  z-index: 100003;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.5);
  width: 160px;
  height: 80px;
  margin: 0 auto;
  border-radius: 12px;
  padding: 10px;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 769px) {
    bottom: 150px;
    opacity: 0.8;
    width: 180px;
    height: 90px;
  }
`;

const SwipeIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 8px;
  
  svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
`;

const PhotoCountIndicator = styled.div`
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  z-index: 100000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  @media (max-width: 768px) {
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    font-size: 0.75rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  width: 100%;
  max-width: 1000px;
  padding: var(--spacing-md);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    padding: var(--spacing-sm);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs);
  }
`;

const photos = [
  {
    id: 1,
    src: "/images/zane_photo_01.jpg",
    caption: "宝贝Zane的灿烂笑容",
    height: "280px"
  },
  {
    id: 2,
    src: "/images/zane_photo_02.jpg",
    caption: "迎接新生命的第一天",
    height: "350px"
  },
  {
    id: 3,
    src: "/images/zane_photo_03.jpg",
    caption: "爸爸妈妈的珍贵时光",
    height: "320px"
  },
  {
    id: 4,
    src: "/images/zane_photo_04.jpg",
    caption: "探索世界的好奇眼神",
    height: "300px"
  },
  {
    id: 5,
    src: "/images/zane_photo_05.jpg",
    caption: "天使般的甜美微笑",
    height: "260px"
  },
  {
    id: 6,
    src: "/images/zane_photo_06.jpg",
    caption: "成长中的每一个里程碑",
    height: "340px"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  }
};

const modalContentVariants = {
  hidden: { 
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const modalImageVariants = {
  enter: {
    opacity: 0,
    scale: 0.9,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    }
  }
};

const ModalGallery: React.FC<{
  photos: typeof photos;
  initialIndex: number;
  onClose: () => void;
  onImageChange?: (index: number) => void;
}> = ({ photos, initialIndex, onClose, onImageChange }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showControls, setShowControls] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(
    localStorage.getItem('hasSeenSwipeHint') !== 'true'
  );
  
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    if (onImageChange) onImageChange(newIndex);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    if (onImageChange) onImageChange(newIndex);
  };

  // 
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold || info.offset.x < -swipeThreshold) {
      //
      setShowSwipeHint(false);
      if (info.offset.x < -swipeThreshold) {
        handleNextImage();
      } else if (info.offset.x > swipeThreshold) {
        handlePrevImage();
      }
    }
  };
  
  const toggleControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setShowControls(!showControls);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (currentIndex !== initialIndex) {
      setShowSwipeHint(false);
    }
  }, [currentIndex, initialIndex]);

  useEffect(() => {
    setImageLoaded(false);
    const img = document.createElement('img');
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = photos[currentIndex].src;
        if (showSwipeHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, window.innerWidth <= 768 ? 5000 : 4000); // 
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, photos, showSwipeHint]);

  // 
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    if (onImageChange) onImageChange(index);
  };

  return (
    <ModalContent
      variants={modalContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={toggleControls}
    >
      <ImageContainer>
        <AnimatePresence initial={false} mode="wait">
          <ModalImage 
            key={`image-${currentIndex}`}
            variants={modalImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            src={photos[currentIndex].src} 
            alt={photos[currentIndex].caption}
            whileDrag={{ cursor: "grabbing", scale: 0.95 }}
            whileTap={{ scale: 0.98 }}
            onLoad={handleImageLoad}
          />
        </AnimatePresence>
        
        {!imageLoaded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1rem'
            }}
          >
            加载中...
          </motion.div>
        )}
      </ImageContainer>
      
      {showControls && (
        <>
          <PhotoCountIndicator>
            {currentIndex + 1} / {photos.length}
          </PhotoCountIndicator>
          
          <NavigationArrow 
            left 
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            ‹
          </NavigationArrow>
          
          <NavigationArrow 
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            ›
          </NavigationArrow>
          
          <IndicatorContainer>
            {photos.map((_, index) => (
              <DotIndicator 
                key={index} 
                active={index === currentIndex} 
                onClick={(e) => {
                  e.stopPropagation();
                  handleIndicatorClick(index);
                }}
              />
            ))}
          </IndicatorContainer>
          
          <CloseButton 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            ×
          </CloseButton>
          
          {showSwipeHint && (
            <SwipeHint
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SwipeIcon 
                animate={{ 
                  x: [-8, 8, -8],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut",
                  repeatType: "mirror"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M12,4L9,1V3H3V5H9V7L12,4Z" />
                </svg>
              </SwipeIcon>
              <span>左右滑动切换图片</span>
            </SwipeHint>
          )}
        </>
      )}
    </ModalContent>
  );
};

const Gallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // 
  const { openModal, closeModal } = useContext(ModalContext);
  const isFirstVisit = useRef(localStorage.getItem('hasSeenSwipeHint') !== 'true');
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const preloadAdjacentImages = (index: number) => {
    const imagesToPreload: string[] = [];
    const prevIndex = (index - 1 + photos.length) % photos.length;
    const nextIndex = (index + 1) % photos.length;
    [prevIndex, index, nextIndex].forEach(idx => {
      const src = photos[idx].src;
      if (!preloadedImages.includes(src)) {
        imagesToPreload.push(src);
      }
    });
    
    imagesToPreload.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
        setPreloadedImages(prev => [...prev, src]);
      };
    });
  };

  const handleMouseEnter = (index: number) => {
    preloadAdjacentImages(index);
  };
  
  const handleImageClick = (index: number) => {
    preloadAdjacentImages(index);
      openModal(
      <ModalGallery 
        photos={photos} 
        initialIndex={index} 
        onClose={() => {
          if (isFirstVisit.current) {
            localStorage.setItem('hasSeenSwipeHint', 'true');
            isFirstVisit.current = false;
          }
          closeModal();
        }}
        onImageChange={(newIndex) => {
          preloadAdjacentImages(newIndex);
        }}
      />
    );
  };

  return (
    <GalleryContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Grid>
        {photos.map((photo, index) => (
          <ImageCard
            key={photo.id}
            onClick={() => handleImageClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            variants={itemVariants}
          >
            <Image src={photo.src} alt={photo.caption} />
            <ImageCaption>
              {photo.caption}
            </ImageCaption>
          </ImageCard>
        ))}
      </Grid>
    </GalleryContainer>
  );
};

export default Gallery; 