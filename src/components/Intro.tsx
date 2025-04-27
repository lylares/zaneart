import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AudioContext } from '../App';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  margin: 0;
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: var(--spacing-xl);

  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`;

const Title = styled(motion.h1)`
  color: #ff6b6b;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  padding: 0 var(--spacing-md);
  background: linear-gradient(135deg, #ff6b6b, #ffb746);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    padding: 0 var(--spacing-sm);
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const floatAnimation = `
  @keyframes float1 {
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-25px) rotate(5deg); }
    50% { transform: translateY(0) rotate(0deg); }
    75% { transform: translateY(20px) rotate(-5deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  @keyframes float2 {
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(25px) rotate(-5deg); }
    50% { transform: translateY(0) rotate(0deg); }
    75% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  @keyframes float3 {
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-30px) rotate(7deg); }
    50% { transform: translateY(0) rotate(0deg); }
    75% { transform: translateY(25px) rotate(-7deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  @keyframes float4 {
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(30px) rotate(-7deg); }
    50% { transform: translateY(0) rotate(0deg); }
    75% { transform: translateY(-25px) rotate(7deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  @keyframes string-sway {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  }
`;

const Balloon = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 100px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15);
  z-index: 0;
  transform-origin: bottom center;
  
  &::before {
    content: "";
    position: absolute;
    width: 12px;
    height: 18px;
    background: inherit;
    border-radius: 50% 50% 0 0;
    bottom: -6px;
    left: 34px;
    transform: rotate(0deg);

    @media (max-width: 768px) {
      width: 9px;
      height: 14px;
      bottom: -4px;
      left: 25px;
    }

    @media (max-width: 480px) {
      width: 8px;
      height: 12px;
      bottom: -3px;
      left: 21px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 80px;
    background: rgba(200, 200, 200, 0.8);
    bottom: -80px;
    left: 39px;
    transform-origin: top;
    animation: string-sway 4s ease-in-out infinite;

    @media (max-width: 768px) {
      height: 60px;
      bottom: -60px;
      left: 29px;
    }

    @media (max-width: 480px) {
      height: 50px;
      bottom: -50px;
      left: 24px;
    }
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 75px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 65px;
  }

  ${floatAnimation}
`;

const Balloon1 = styled(Balloon)`
  top: 10%;
  left: 5%;
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  animation: float1 6s ease-in-out infinite;

  @media (max-width: 768px) {
    top: 5%;
    left: 2%;
  }
`;

const Balloon2 = styled(Balloon)`
  top: 20%;
  right: 5%;
  background: linear-gradient(135deg, #4ECDC4, #A8E6CF);
  animation: float2 7s ease-in-out infinite;

  @media (max-width: 768px) {
    top: 10%;
    right: 2%;
  }
`;

const Balloon3 = styled(Balloon)`
  bottom: 20%;
  left: 5%;
  background: linear-gradient(135deg, #FFE66D, #FFD93D);
  animation: float3 8s ease-in-out infinite;

  @media (max-width: 768px) {
    bottom: 10%;
    left: 2%;
  }
`;

const Balloon4 = styled(Balloon)`
  bottom: 10%;
  right: 5%;
  background: linear-gradient(135deg, #FF9F9F, #FF6B6B);
  animation: float4 9s ease-in-out infinite;

  @media (max-width: 768px) {
    bottom: 5%;
    right: 2%;
  }
`;

const Balloon5 = styled(Balloon)`
  top: 15%;
  left: 25%;
  background: linear-gradient(135deg, #C795E6, #A06CD5);
  animation: float2 6.5s ease-in-out infinite;
  transform: scale(0.85);

  @media (max-width: 768px) {
    top: 8%;
    left: 20%;
  }
`;

const Balloon6 = styled(Balloon)`
  bottom: 15%;
  right: 25%;
  background: linear-gradient(135deg, #FFB7B7, #FF8989);
  animation: float1 7.5s ease-in-out infinite;
  transform: scale(0.9);

  @media (max-width: 768px) {
    bottom: 8%;
    right: 20%;
  }
`;

const Confetti = styled(motion.div)`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${props => props.color || '#ff6b6b'};
  border-radius: 50%;
  z-index: 0;
  animation: confetti 5s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;

const Confetti1 = styled(Confetti)`
  top: 5%;
  left: 10%;

  @media (max-width: 768px) {
    top: 3%;
    left: 5%;
  }
`;

const Confetti2 = styled(Confetti)`
  top: 10%;
  right: 10%;

  @media (max-width: 768px) {
    top: 5%;
    right: 5%;
  }
`;

const Confetti3 = styled(Confetti)`
  bottom: 10%;
  left: 10%;

  @media (max-width: 768px) {
    bottom: 5%;
    left: 5%;
  }
`;

const Confetti4 = styled(Confetti)`
  bottom: 5%;
  right: 10%;

  @media (max-width: 768px) {
    bottom: 3%;
    right: 5%;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const MusicButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 2rem;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 107, 107, 0.5);
  animation: pulse 2s infinite;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(255, 107, 107, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.4rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.3rem 1.2rem;
  }
`;

const MusicIcon = styled.div<{ isPlaying: boolean }>`
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MusicDot = styled.div<{ isPlaying: boolean; delay: number; position: 'top' | 'middle' | 'bottom' }>`
  width: ${props => props.isPlaying ? '7px' : '5px'};
  height: ${props => props.isPlaying ? '7px' : '5px'};
  background: #FF6B6B;
  border-radius: 50%;
  position: absolute;
  transition: all 0.3s ease;
  
  ${props => {
    if (props.position === 'top') {
      return `
        top: ${props.isPlaying ? '0' : '6px'};
        left: 0;
        animation: ${props.isPlaying ? 'bounce1 0.6s infinite alternate' : 'none'};
        animation-delay: ${props.delay}s;
      `;
    } else if (props.position === 'middle') {
      return `
        top: ${props.isPlaying ? '10px' : '6px'};
        left: 50%;
        transform: translateX(-50%);
        animation: ${props.isPlaying ? 'bounce2 0.6s infinite alternate' : 'none'};
        animation-delay: ${props.delay}s;
      `;
    } else {
      return `
        top: ${props.isPlaying ? '0' : '6px'};
        right: 0;
        animation: ${props.isPlaying ? 'bounce3 0.6s infinite alternate' : 'none'};
        animation-delay: ${props.delay}s;
      `;
    }
  }}
  
  @keyframes bounce1 {
    from { transform: translateY(0); }
    to { transform: translateY(-4px); }
  }
  
  @keyframes bounce2 {
    from { transform: translateX(-50%) translateY(0); }
    to { transform: translateX(-50%) translateY(4px); }
  }
  
  @keyframes bounce3 {
    from { transform: translateY(0); }
    to { transform: translateY(-4px); }
  }
`;

const AudioWave = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #FF6B6B, #FFD700, #4ECDC4, #A06CD5);
  background-size: 200% 100%;
  transform: scaleX(${props => props.isPlaying ? 1 : 0});
  transform-origin: left;
  transition: transform 0.3s ease;
  animation: ${props => props.isPlaying ? 'wave 2s linear infinite' : 'none'};
  
  @keyframes wave {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
`;

const Intro: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { isPlaying, toggleMusic, audioError } = useContext(AudioContext);
  return (
    <Container>
      <Balloon1 />
      <Balloon2 />
      <Balloon3 />
      <Balloon4 />
      <Balloon5 />
      <Balloon6 />
      <Confetti1 color="#FF6B6B" />
      <Confetti2 color="#4ECDC4" />
      <Confetti3 color="#FFE66D" />
      <Confetti4 color="#A06CD5" />
      
      <Content
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Title 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            textShadow: "0 0 15px rgba(255,255,255,0.8)",
            transition: { duration: 0.3 } 
          }}
        >
          <span style={{ color: "#FF6B6B" }}>🎉</span> 
          <span style={{ background: "linear-gradient(45deg, #FF6B6B, #FFD700, #4ECDC4, #A06CD5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Zane 一周岁啦
          </span> 
          <span style={{ color: "#4ECDC4" }}>🎉</span>
        </Title>
        <motion.div 
          variants={itemVariants}
          style={{ margin: "1rem 0" }}
        >
          <MusicButton 
            onClick={toggleMusic} 
            title={audioError || "播放/暂停音乐"}
            style={audioError ? {borderColor: '#ff0000'} : {}}
          >
            <MusicIcon isPlaying={isPlaying}>
              <MusicDot isPlaying={isPlaying} delay={0} position="top" />
              <MusicDot isPlaying={isPlaying} delay={0.2} position="middle" />
              <MusicDot isPlaying={isPlaying} delay={0.4} position="bottom" />
            </MusicIcon>
            {isPlaying ? "暂停" : "播放"}音乐
            {audioError && <span style={{fontSize: '0.7rem', color: '#ff0000', marginLeft: '5px'}}>⚠️</span>}
            <AudioWave isPlaying={isPlaying} />
          </MusicButton>
        </motion.div>
      </Content>
    </Container>
  );
};

export default Intro; 