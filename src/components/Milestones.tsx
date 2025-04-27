import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MilestonesContainer = styled(motion.section)`
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

const MilestonesGrid = styled.div`
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

const MilestoneCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  aspect-ratio: 1;
  justify-content: center;

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const IconWrapperContainer = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: var(--spacing-md);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    margin-bottom: var(--spacing-sm);
  }
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  overflow: hidden; /* 确保内容不溢出 */
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// 
const AnimatedIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const iconFadeInVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const birthIconVariants = {
  animate: {
    y: [0, -5, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const teethIconVariants = {
  animate: {
    rotateZ: [0, 5, -5, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const crawlIconVariants = {
  animate: {
    x: [-5, 5, -5],
    scale: [1, 1.1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut"
    }
  }
};

const talkIconVariants = {
  animate: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const walkIconVariants = {
  animate: {
    x: [-8, 8, -8],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const Bubble = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: var(--primary-color);
  opacity: 0.2;
`;

const Rays = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Ray = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 10px;
  background: var(--primary-color);
  opacity: 0.5;
  transform-origin: bottom center;
`;

const MonthRing = styled.div<{ month?: number }>`
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border-radius: 50%;
  z-index: 1;
  border: 4px solid rgba(200, 200, 200, 0.5);
  box-sizing: border-box;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    box-sizing: border-box;
    background: ${props => {
      const month = props.month || 0;
      if (month === 0) return 'transparent';
      const percentage = (month * 30 / 360) * 100;
      return `conic-gradient(
        from 0deg,
        var(--primary-color) 0% ${percentage}%,
        transparent ${percentage}% 100%
      )`;
    }};
    opacity: 0.9;
  }
`;

const MonthDivider = styled.div<{ rotate: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transform: rotate(${props => props.rotate}deg);
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    width: 2px;
    height: 8px;
    background: white;
    transform: translateX(-50%);
  }
`;

const Date = styled.h3`
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-sm);
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: var(--primary-color);
    border-radius: 1px;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
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
      ease: "easeOut"
    }
  }
};
const RollOverIcon = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Baby = styled(motion.div)`
  width: 32px;
  height: 22px;
  background: linear-gradient(135deg, #FFD3B5, #FFBFA0);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
  box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #FFD3B5, #FFBFA0);
    border-radius: 50%;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: inset -1px -1px 3px rgba(0, 0, 0, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 2px;
    background: #333;
    border-radius: 2px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const BabyEyes = styled.div`
  position: absolute;
  width: 10px;
  height: 3px;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  
  &::before, &::after {
    content: '';
    width: 3px;
    height: 3px;
    background: #333;
    border-radius: 50%;
    position: absolute;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const BabyLimbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 7px;
    height: 10px;
    background: linear-gradient(135deg, #FFD3B5, #FFBFA0);
    border-radius: 4px;
  }
  
  &::before {
    bottom: -3px;
    left: -4px;
    transform: rotate(-30deg);
  }
  
  &::after {
    bottom: -3px;
    right: -4px;
    transform: rotate(30deg);
  }
`;

const BabyArms = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 7px;
    height: 9px;
    background: linear-gradient(135deg, #FFD3B5, #FFBFA0);
    border-radius: 4px;
  }
  
  &::before {
    top: 2px;
    left: -5px;
    transform: rotate(-20deg);
  }
  
  &::after {
    top: 2px;
    right: -5px;
    transform: rotate(20deg);
  }
`;

const BabySmile = styled.div`
  position: absolute;
  width: 8px;
  height: 4px;
  border-bottom: 2px solid #FF6B6B;
  border-radius: 50%;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
`;

const Arc = styled(motion.div)`
  position: absolute;
  width: 42px;
  height: 42px;
  border: 2px dashed var(--primary-color);
  border-bottom: none;
  border-radius: 50% 50% 0 0;
  top: -10px;
  left: 50%;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(0deg);
`;

const TinyStars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const TinyStar = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary-color);
  opacity: 0.6;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
`;

const BirthIcon = () => (
  <motion.div 
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >

    <motion.div
      style={{
        position: 'absolute',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,248,227,0.9) 0%, rgba(255,248,227,0) 70%)',
        opacity: 0.8
      }}
      animate={{
        scale: [0.95, 1.05, 0.95],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    <motion.div
      style={{
        position: 'relative',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      animate={{
        y: [0, -2, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }}
    >

      <motion.div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50% 50% 45% 45%',
          background: 'linear-gradient(135deg, #FFE6D5, #FFDCC0)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
        }}
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut"
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            width: '18px',
            height: '14px',
            borderRadius: '50% 50% 45% 45%',
            top: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          <div style={{
            display: 'flex',
            width: '10px',
            justifyContent: 'space-between',
            marginTop: '2px'
          }}>
            <motion.div
              style={{
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.7)'
              }}
              animate={{
                scaleY: [1, 0.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.05, 0.1],
                ease: "easeInOut"
              }}
            />
            <motion.div
              style={{
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.7)'
              }}
              animate={{
                scaleY: [1, 0.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.05, 0.1],
                ease: "easeInOut"
              }}
            />
          </div>
          
          <motion.div
            style={{
              width: '5px',
              height: '2px',
              marginTop: '5px',
              background: '#F97575',
              borderRadius: '2px'
            }}
            animate={{
              width: ['5px', '4px', '6px', '5px'],
              height: ['2px', '3px', '2px']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse" as const,
              times: [0, 0.3, 0.6, 1],
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            border: '3px solid #F5F1FF',
            borderTop: '3px solid transparent',
            top: '-3px',
            left: '-3px',
            transform: 'rotate(45deg)'
          }}
          animate={{
            rotate: [45, 65, 45],
            borderColor: ['#F5F1FF transparent #F5F1FF #F5F1FF', '#F8F5FF transparent #F8F5FF #F8F5FF', '#F5F1FF transparent #F5F1FF #F5F1FF']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFE6D5, #FFDCC0)',
            bottom: '2px',
            right: '0px',
            zIndex: 2
          }}
          animate={{
            x: [0, 1, -1, 0],
            y: [0, -1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
    
    <Rays>
      {Array.from({ length: 8 }).map((_, i) => (
        <Ray
          key={i}
          style={{
            top: '50%',
            left: '50%',
            width: '2px',
            background: 'linear-gradient(to top, rgba(255,213,79,0.8), rgba(255,213,79,0))',
            transform: `rotate(${i * 45}deg) translateY(-25px)`
          }}
          animate={{
            height: ['10px', '15px', '10px'],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.1,
            repeatType: "reverse" as const
          }}
        />
      ))}
    </Rays>
    
    {Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: `${3 + i}px`,
          height: `${3 + i}px`,
          borderRadius: '50%',
          background: '#FFD54F',
          opacity: 0,
          top: `${60 - i * 10}%`,
          left: `${60 + i * 5}%`
        }}
        animate={{
          y: [-5, -15],
          x: [0, i * 2],
          scale: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: 1.5 + i * 0.2,
          delay: i * 0.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut"
        }}
      />
    ))}
    
    <motion.div
      style={{
        position: 'absolute',
        bottom: '-2px',
        fontSize: '10px',
        color: '#FF6B8B',
        fontWeight: 'bold'
      }}
      animate={{
        opacity: [0, 1, 0],
        y: [5, 0, 5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }}
    >
      NEW
    </motion.div>
  </motion.div>
);

const RollOverEnhanced = () => (
  <motion.div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >

    <motion.div
      style={{
        position: 'absolute',
        bottom: '8px',
        width: '28px',
        height: '4px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.1)',
        filter: 'blur(2px)'
      }}
      animate={{
        opacity: [0.2, 0.5, 0.2],
        scale: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }}
    />
    
    <motion.div
      style={{
        position: 'relative',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2px'
      }}
      animate={{
        rotateZ: [0, 360],
        y: [0, -2, 0]
      }}
      transition={{
        rotateZ: {
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1.2,
          ease: [0.5, 0.1, 0.3, 0.9]
        },
        y: {
          duration: 1.25,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut"
        }
      }}
    >

      <motion.div
        style={{
          position: 'relative',
          width: '24px',
          height: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        animate={{
          rotateY: [0, 180, 360],
          scale: [1, 1.05, 1.1, 1.05, 1]
        }}
        transition={{
          rotateY: {
            duration: 2.5, 
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: [0.5, 0.1, 0.3, 0.9],
            times: [0, 0.5, 1]
          },
          scale: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1.2,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "easeInOut"
          }
        }}
      >
        <motion.div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
            position: 'relative',
            zIndex: 3
          }}
          animate={{
            rotateY: [0, 180, 360]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >

          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >

            <div style={{
              display: 'flex',
              width: '8px',
              justifyContent: 'space-between',
              marginTop: '3px'
            }}>
              <motion.div
                style={{
                  width: '2px',
                  height: '2px',
                  borderRadius: '50%',
                  background: '#333'
                }}
                animate={{
                  scaleY: [1, 0.2, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                style={{
                  width: '2px',
                  height: '2px',
                  borderRadius: '50%',
                  background: '#333'
                }}
                animate={{
                  scaleY: [1, 0.2, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <motion.div
              style={{
                width: '4px',
                height: '2px',
                marginTop: '3px',
                borderRadius: '2px',
                background: '#F97575'
              }}
              animate={{
                scaleX: [1, 1.5, 0.8, 1],
                scaleY: [1, 0.8, 1.2, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1.2,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        
        <motion.div
          style={{
            width: '10px',
            height: '12px',
            borderRadius: '5px 5px 2px 2px',
            background: 'var(--primary-color)',
            opacity: 0.8,
            marginTop: '-2px',
            position: 'relative',
            zIndex: 2
          }}
          animate={{
            rotate: [-3, 3, -3]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut"
          }}
        />
        
        <motion.div style={{
          position: 'absolute',
          width: '100%', 
          height: '100%',
          zIndex: 1
        }}>

          <motion.div
            style={{
              position: 'absolute',
              width: '3px',
              height: '8px',
              background: 'var(--primary-color)',
              opacity: 0.8,
              borderRadius: '1px',
              top: '14px',
              left: '5px',
              transformOrigin: 'top center'
            }}
            animate={{
              rotate: [-10, -60, -10]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            style={{
              position: 'absolute',
              width: '3px',
              height: '8px',
              background: 'var(--primary-color)',
              opacity: 0.8,
              borderRadius: '1px',
              top: '14px',
              right: '5px',
              transformOrigin: 'top center'
            }}
            animate={{
              rotate: [10, 60, 10]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            style={{
              position: 'absolute',
              width: '3px',
              height: '8px',
              background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
              borderRadius: '1px',
              bottom: '4px',
              left: '7px',
              transformOrigin: 'top center'
            }}
            animate={{
              rotate: [-5, -30, -5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            style={{
              position: 'absolute',
              width: '3px',
              height: '8px',
              background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
              borderRadius: '1px',
              bottom: '4px',
              right: '7px',
              transformOrigin: 'top center'
            }}
            animate={{
              rotate: [5, 30, 5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
    
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >

      <motion.div
        style={{
          position: 'absolute',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1.5px dashed rgba(var(--primary-rgb), 0.3)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 3.7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '8px',
            height: '1.5px',
            background: 'var(--primary-color)',
            opacity: 0,
            borderRadius: '1px',
            top: '50%',
            left: '50%',
            transform: `rotate(${90 * i}deg) translate(16px, 0)`,
            transformOrigin: 'left center'
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.2 + 0.3,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeOut"
          }}
        />
      ))}
      
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i + 10}
          style={{
            position: 'absolute',
            width: '5px',
            height: '5px',
            opacity: 0,
            top: `${25 + Math.random() * 50}%`,
            left: `${25 + Math.random() * 50}%`
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--primary-color)',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              borderRadius: '1px'
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: 0.7,
              delay: i * 0.6 + Math.random() * 0.5,
              repeat: Infinity,
              repeatDelay: 2.5 + Math.random(),
              ease: "easeOut"
            }}
          />
        </motion.div>
      ))}

      <motion.div
        style={{
          position: 'absolute',
          fontSize: '8px',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          opacity: 0,
          bottom: '0px',
          textAlign: 'center',
          width: '100%'
        }}
        animate={{
          opacity: [0, 1, 0],
          y: [5, 0, 5]
        }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "easeInOut"
        }}
      >
        翻!
      </motion.div>
    </motion.div>
  </motion.div>
);

const ToothIcon = () => (
  <motion.div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <motion.div
      style={{
        position: 'absolute',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
        opacity: 0.6
      }}
      animate={{
        scale: [0.9, 1.1, 0.9],
        opacity: [0.4, 0.7, 0.4]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    <motion.div
      style={{
        width: '28px',
        height: '34px',
        position: 'relative'
      }}
      animate={{
        y: [0, -2, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '60%',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)',
          borderRadius: '6px 6px 2px 2px',
          position: 'absolute',
          top: 0,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}
        animate={{
          boxShadow: [
            '0 2px 6px rgba(0,0,0,0.1)',
            '0 3px 8px rgba(0,0,0,0.15)',
            '0 2px 6px rgba(0,0,0,0.1)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse" as const
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            width: '80%',
            height: '1px',
            background: 'rgba(220,220,220,0.8)',
            transform: 'translateX(-50%)'
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60%',
            height: '1px',
            background: 'rgba(220,220,220,0.6)',
            transform: 'translateX(-50%)'
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            top: '30%',
            right: '25%',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 5px rgba(255,255,255,1)'
          }}
          animate={{
            opacity: [1, 0.5, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.div
        style={{
          width: '80%',
          height: '20%',
          background: 'linear-gradient(180deg, #F8F8F8 0%, #F0F0F0 100%)',
          position: 'absolute',
          top: '60%',
          left: '10%',
          borderRadius: '0 0 5px 5px'
        }}
      />
      
      <motion.div
        style={{
          width: '60%',
          height: '25%',
          background: 'linear-gradient(180deg, #F0F0F0 0%, #E8E8E8 100%)',
          position: 'absolute',
          top: '80%',
          left: '20%',
          borderRadius: '0 0 8px 8px',
          boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.05)'
        }}
        animate={{
          boxShadow: [
            'inset 0 -2px 4px rgba(0,0,0,0.05)',
            'inset 0 -3px 6px rgba(0,0,0,0.08)',
            'inset 0 -2px 4px rgba(0,0,0,0.05)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse" as const
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          width: '60%',
          height: '1px',
          background: 'rgba(200,200,200,0.5)',
          transform: 'translateX(-50%)'
        }}
      />
    </motion.div>
    
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: `${3 + i * 1.5}px`,
          height: `${3 + i * 1.5}px`,
          borderRadius: '50%',
          background: 'var(--primary-color)',
          opacity: 0,
          top: `${40 + Math.random() * 30}%`,
          right: `${10 + Math.random() * 25}%`
        }}
        animate={{
          y: [-5, -15 - i * 2],
          x: [0, (Math.random() - 0.5) * 10],
          scale: [0, 1, 0],
          opacity: [0, 0.6 - i * 0.1, 0]
        }}
        transition={{
          duration: 1.5 + i * 0.2,
          delay: i * 0.25,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut"
        }}
      />
    ))}
  
    <motion.div
      style={{
        position: 'absolute',
        bottom: '5px',
        fontSize: '10px',
        fontWeight: 'bold',
        color: 'var(--primary-color)'
      }}
      animate={{
        opacity: [0, 1, 0],
        y: [5, 0, 5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 2,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }}
    >
      POP!
    </motion.div>
  </motion.div>
);

// 
const CrawlIcon = () => (
  <motion.div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >

    <motion.div
      style={{
        position: 'absolute',
        bottom: '9px',
        left: '5px',
        right: '5px',
        height: '2px',
        background: 'linear-gradient(to right, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.4), rgba(var(--primary-rgb), 0.1))',
        borderRadius: '1px'
      }}
    />
    
    <motion.div
      style={{
        position: 'absolute',
        bottom: '10px',
        height: '1px',
        background: 'rgba(var(--primary-rgb), 0.2)',
        left: '8px',
        right: '8px',
        borderRadius: '1px',
        zIndex: 0
      }}
      animate={{
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }}
    />
    
    <motion.div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5px'
      }}
    >

      <motion.div
        style={{
          position: 'relative',
          width: '32px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2
        }}
        animate={{
          x: [-10, 10, -10],
          y: [0, -1, 0, -1, 0],
          rotate: [0, 2, 0, -2, 0]
        }}
        transition={{
          x: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1]
          },
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1]
          }
        }}
      >

        <motion.div
          style={{
            width: '24px',
            height: '16px',
            background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
            borderRadius: '12px 12px 8px 8px',
            position: 'relative',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transform: 'rotate(-2deg)'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
              borderRadius: '50%',
              left: '-4px',
              top: '-3px',
              zIndex: 3
            }}
            animate={{
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: '#333',
                borderRadius: '50%',
                top: '4px',
                left: '3px'
              }}
              animate={{
                scaleY: [1, 0.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.1, 0.2],
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              style={{
                position: 'absolute',
                width: '3px',
                height: '1.5px',
                background: '#F97575',
                borderRadius: '2px',
                bottom: '3px',
                left: '4px'
              }}
              animate={{
                width: ['3px', '4px', '3px']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <motion.div
            style={{
              position: 'absolute',
              width: '9px',
              height: '9px',
              background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
              borderRadius: '50%',
              right: '-2px',
              bottom: '0px'
            }}
          />
          
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                width: '5px',
                height: '4px',
                background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
                borderRadius: '2px',
                left: '1px',
                bottom: '-1px',
                transformOrigin: 'top left'
              }}
              animate={{
                rotate: [0, -20, 0, -10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              style={{
                position: 'absolute',
                width: '6px',
                height: '4px',
                background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
                borderRadius: '2px',
                right: '2px',
                bottom: '-1px',
                transformOrigin: 'top right'
              }}
              animate={{
                rotate: [0, 15, 0, 10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
    
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: '3px',
          height: '1px',
          background: 'var(--primary-color)',
          opacity: 0,
          bottom: '11px',
          left: `${15 + i * 15}%`,
          borderRadius: '1px'
        }}
        animate={{
          opacity: [0, 0.4, 0],
          width: ['3px', '5px', '3px']
        }}
        transition={{
          duration: 2,
          delay: i * 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
      />
    ))}
    
    <motion.div
      style={{
        position: 'absolute',
        fontSize: '8px',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        opacity: 0,
        bottom: '0px',
        left: '60%',
        whiteSpace: 'nowrap'
      }}
      animate={{
        opacity: [0, 0.7, 0],
        x: [0, 5, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut"
      }}
    >
      爬呀爬~
    </motion.div>
  </motion.div>
);

// 
const TalkIcon = () => (
  <motion.div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <motion.div
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50% 50% 45% 45%',
        background: 'linear-gradient(135deg, #FFEFD9, #FFD8A8)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}
      animate={{
        scale: [1, 1.08, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }}
    >

      <motion.div
        style={{
          display: 'flex',
          width: '16px',
          justifyContent: 'space-between',
          marginTop: '8px'
        }}
      >
        <motion.div 
          style={{ 
            width: '4px', 
            height: '4px', 
            borderRadius: '50%', 
            background: '#333'
          }}
          animate={{
            scaleY: [1, 0.4, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          style={{ 
            width: '4px', 
            height: '4px', 
            borderRadius: '50%', 
            background: '#333'
          }}
          animate={{
            scaleY: [1, 0.4, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.div
        style={{
          width: '12px',
          height: '6px',
          marginTop: '6px',
          position: 'relative'
        }}
        animate={{
          scaleX: [1, 1.3, 0.9, 1.2, 1],
          scaleY: [1, 0.7, 1.1, 0.8, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            background: '#FF6B6B',
            borderRadius: '2px 2px 6px 6px'
          }}
        />
      </motion.div>
    </motion.div>
    
    <motion.div
      style={{
        position: 'absolute',
        background: 'white',
        borderRadius: '10px',
        padding: '3px 6px',
        fontSize: '10px',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        top: '5px',
        right: '0px',
        zIndex: 5,
        transformOrigin: 'left bottom'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 1, 0],
        opacity: [0, 1, 1, 0],
        x: [5, 0, 0, -5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.1, 0.9, 1],
        ease: "easeInOut"
      }}
    >
      爸爸
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2px',
          left: '-4px',
          width: '8px',
          height: '8px',
          background: 'white',
          borderRadius: '2px',
          transform: 'rotate(45deg)',
          zIndex: -1
        }}
      />
    </motion.div>
    
    <motion.div
      style={{
        position: 'absolute',
        background: 'white',
        borderRadius: '10px',
        padding: '3px 6px',
        fontSize: '10px',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        bottom: '5px',
        left: '0px',
        zIndex: 5,
        transformOrigin: 'right top'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 1, 0],
        opacity: [0, 1, 1, 0],
        x: [-5, 0, 0, 5]
      }}
      transition={{
        duration: 2,
        delay: 2,
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.1, 0.9, 1],
        ease: "easeInOut"
      }}
    >
      妈妈
      <motion.div
        style={{
          position: 'absolute',
          top: '2px',
          right: '-4px',
          width: '8px',
          height: '8px',
          background: 'white',
          borderRadius: '2px',
          transform: 'rotate(45deg)',
          zIndex: -1
        }}
      />
    </motion.div>
    
    {Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: `${36 + i * 10}px`,
          height: `${36 + i * 10}px`,
          borderRadius: '50%',
          border: '1px solid var(--primary-color)',
          opacity: 0
        }}
        animate={{
          scale: [0.5, 1.2],
          opacity: [0, 0.2, 0]
        }}
        transition={{
          duration: 1,
          delay: i * 0.2,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeOut"
        }}
      />
    ))}
  </motion.div>
);

// 
const WalkIcon = () => (
  <motion.div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}
  >
    <motion.div
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '5px',
        right: '5px',
        height: '2px',
        background: 'var(--primary-color)',
        opacity: 0.3,
        borderRadius: '1px'
      }}
    />
    
    <motion.div
      style={{
        position: 'relative',
        width: '24px',
        height: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '5px'
      }}
      animate={{
        x: [-15, 15],
        scaleX: [1, -1, 1]
      }}
      transition={{
        x: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut"
        },
        scaleX: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "linear",
          times: [0, 0.5, 1]
        }
      }}
    >

      <motion.div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFECC9, #FFD89F)',
          marginBottom: '2px'
        }}
        animate={{
          y: [0, -1, 0, -1, 0]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
      />
      
      <motion.div
        style={{
          width: '10px',
          height: '12px',
          borderRadius: '5px 5px 2px 2px',
          background: 'var(--primary-color)',
          opacity: 0.8
        }}
        animate={{
          rotate: [-3, 3, -3]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '10px'
        }}
      >

        <motion.div
          style={{
            position: 'absolute',
            width: '3px',
            height: '8px',
            background: 'var(--primary-color)',
            opacity: 0.8,
            borderRadius: '1px',
            left: '4px',
            top: '0',
            transformOrigin: 'top'
          }}
          animate={{
            rotate: [-30, 30, -30]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            width: '3px',
            height: '8px',
            background: 'var(--primary-color)',
            opacity: 0.8,
            borderRadius: '1px',
            right: '4px',
            top: '0',
            transformOrigin: 'top'
          }}
          animate={{
            rotate: [30, -30, 30]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
    
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          bottom: '12px',
          width: '3px',
          height: '5px',
          borderRadius: '1px',
          background: 'var(--primary-color)',
          opacity: 0,
          left: `${(i % 2 === 0 ? 15 : 25) + Math.floor(i/2) * 15}%`
        }}
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0, 1, 0.8]
        }}
        transition={{
          duration: 1,
          delay: i * 0.3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeOut"
        }}
      />
    ))}
  </motion.div>
);

// 
const milestones = [
  {
    date: '2024年4月',
    description: 'Zane 出生了！',
    icon: (
      <AnimatedIcon
        variants={birthIconVariants}
        animate="animate"
        initial="hidden"
        whileHover={{ scale: 1.1 }}
      >
        <BirthIcon />
      </AnimatedIcon>
    )
  },
  {
    date: '2024年5月',
    description: '第一次翻身',
    icon: (
      <AnimatedIcon
        whileHover={{ scale: 1.1 }}
      >
        <RollOverEnhanced />
      </AnimatedIcon>
    )
  },
  {
    date: '2025年2月',
    description: '第一颗牙齿长出来了',
    icon: (
      <AnimatedIcon
        variants={teethIconVariants}
        animate="animate"
        initial="hidden"
        whileHover={{ scale: 1.1 }}
      >
        <ToothIcon />
      </AnimatedIcon>
    )
  },
  {
    date: '2025年2月',
    description: '开始爬行了',
    icon: (
      <AnimatedIcon
        variants={crawlIconVariants}
        animate="animate"
        initial="hidden"
        whileHover={{ scale: 1.1 }}
      >
        <CrawlIcon />
      </AnimatedIcon>
    )
  },
  {
    date: '2025年3月',
    description: '第一次叫爸爸妈妈',
    icon: (
      <AnimatedIcon
        variants={talkIconVariants}
        animate="animate"
        initial="hidden"
        whileHover={{ scale: 1.1 }}
      >
        <TalkIcon />
      </AnimatedIcon>
    )
  },
  {
    date: '2025年3月',
    description: '开始学走路了',
    icon: (
      <AnimatedIcon
        variants={walkIconVariants}
        animate="animate"
        initial="hidden"
        whileHover={{ scale: 1.1 }}
      >
        <WalkIcon />
      </AnimatedIcon>
    )
  }
];

const extractMonth = (dateString: string): number => {
  const matches = dateString.match(/(\d+)月/);
  return matches ? parseInt(matches[1]) : 0;
};

const Milestones: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <MilestonesContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <MilestonesGrid>
        {milestones.map((milestone, index) => {
          const month = extractMonth(milestone.date);
          
          return (
            <MilestoneCard
              key={index}
              variants={itemVariants}
            >
              <IconWrapperContainer>
                <MonthRing month={month}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <MonthDivider 
                      key={i}
                      rotate={i * 30}
                    />
                  ))}
                </MonthRing>
                <IconWrapper>
                  {milestone.icon}
                </IconWrapper>
              </IconWrapperContainer>
              <Date>{milestone.date}</Date>
              <Description>{milestone.description}</Description>
            </MilestoneCard>
          );
        })}
      </MilestonesGrid>
    </MilestonesContainer>
  );
};

export default Milestones;