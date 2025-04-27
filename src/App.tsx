import React, { useState, createContext, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Intro from './components/Intro';
import Gallery from './components/Gallery';
import Milestones from './components/Milestones';
import Footer from './components/Footer';
import GlobalStyles from './styles/GlobalStyles';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';

// 创建全局遮罩上下文
interface ModalContextType {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  modalContent: null,
  openModal: () => {},
  closeModal: () => {},
});

// 创建全局音频上下文
interface AudioContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  audioError: string | null;
}

export const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleMusic: () => {},
  audioError: null,
});

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-gradient);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem 0 2rem;
  position: relative;
  z-index: 1;
`;

const Section = styled.section`
  min-height: calc(100vh - 180px);
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 1rem auto 2rem;
  max-width: 1200px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: calc(100vh - 150px);
    border-radius: 15px;
    margin: 0.75rem auto 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
    margin: 0.5rem auto 1.5rem;
    min-height: calc(100vh - 130px);
    border-radius: 12px;
  }

  &:hover {
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

// 全局遮罩样式
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
`;

function App() {
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    modalContent: null as React.ReactNode,
  });

  // 
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // 
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.remove();
    }
    
    const audioUrl = '/audio/happy-birthday.mp3';
    
    const audio = new Audio();
    audio.src = audioUrl;
    audio.preload = 'auto';
    audio.loop = true;
    
    const handleError = () => {
      if (audio.src !== '/audio/happy-birthday.mp3'){
        audio.src = '/audio/happy-birthday.mp3';
        audio.load();
      } else {
        setAudioError('无法加载音频文件');
      }
    };
    
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    
    audioRef.current = audio;
    
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('play', () => {});
        audio.removeEventListener('pause', () => {});
      }
    };
  }, []);
  
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        setAudioError(null);
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            setAudioError('浏览器阻止了音频播放');
            
            const audioUrl = 'https://imgs.todaybing.com/media/happy-birthday.mp3';
            
            const audioElement = document.createElement('audio');
            audioElement.controls = false;
            audioElement.style.display = 'none';
            audioElement.src = audioUrl;
            audioElement.loop = true;
            document.body.appendChild(audioElement);
            
            const inlinePlayPromise = audioElement.play();
            if (inlinePlayPromise) {
              inlinePlayPromise
                .then(() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                  }
                  audioRef.current = audioElement;
                  setIsPlaying(true);
                  setAudioError(null);
                })
                .catch(finalError => {
                  document.body.removeChild(audioElement);
                  
                  const localAudioElement = document.createElement('audio');
                  localAudioElement.controls = false;
                  localAudioElement.style.display = 'none';
                  localAudioElement.src = '/audio/happy-birthday.mp3';
                  localAudioElement.loop = true;
                  document.body.appendChild(localAudioElement);
                  
                  localAudioElement.play()
                    .then(() => {
                      if (audioRef.current) {
                        audioRef.current.pause();
                      }
                      audioRef.current = localAudioElement;
                      setIsPlaying(true);
                      setAudioError(null);
                    })
                    .catch(() => {
                      document.body.removeChild(localAudioElement);
                      setAudioError('无法播放音频，请检查浏览器设置');
                    });
                });
            }
          });
        }
      }
    } catch (error) {
      setAudioError('播放音频时出错');
    }
  };

  const openModal = (content: React.ReactNode) => {
    setModalState({
      isModalOpen: true,
      modalContent: content,
    });
    // 
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalState({
      isModalOpen: false,
      modalContent: null,
    });
    // 
    document.body.style.overflow = '';
  };

  return (
    <ErrorBoundary>
      <GlobalStyles />
      <ModalContext.Provider 
        value={{
          isModalOpen: modalState.isModalOpen,
          modalContent: modalState.modalContent,
          openModal,
          closeModal,
        }}
      >
        <AudioContext.Provider
          value={{
            isPlaying,
            toggleMusic,
            audioError
          }}
        >
          <Router>
            <AppContainer>
              <Header />
              <Navigation />
              <MainContent>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={
                    <Section>
                      <Intro />
                    </Section>
                  } />
                  <Route path="/gallery" element={
                    <Section>
                      <Gallery />
                    </Section>
                  } />
                  <Route path="/milestones" element={
                    <Section>
                      <Milestones />
                    </Section>
                  } />
                </Routes>
              </MainContent>
              <Footer />
            
              <AnimatePresence>
                {modalState.isModalOpen && (
                  <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                  >
                    {modalState.modalContent}
                  </ModalOverlay>
                )}
              </AnimatePresence>
            </AppContainer>
          </Router>
        </AudioContext.Provider>
      </ModalContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
