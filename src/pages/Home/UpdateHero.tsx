import React, { ReactElement, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Drawer from '../../components/Drawer';
import mutedImg_1 from 'src/assests/event/winter/image(1).png';
import mutedImg_2 from 'src/assests/event/winter/image(2).png';
import youtubeIcon from 'src/assests/event/winter/youtube.png';
import { Video } from './video';
import BannerSlide from './BannerSlide';
import newRaritiesBanner from 'src/assests/banners/new-rarities.webp';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { DragDealer } from 'src/carousel/DragDealer';
import { useSwipe } from 'src/carousel/useSwipe';

const Contain = styled.div`
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    margin-top: 0px;
  }
`;

/* indicadores em blocos pixelados, no lugar das bolinhas */
const Dot = styled.div<{ show: boolean }>`
  width: ${({ show }) => (show ? '18px' : '14px')};
  height: ${({ show }) => (show ? '18px' : '14px')};
  opacity: ${({ show }) => (show ? '1' : '0.75')};
  border: 2px solid #05060f;
  border-radius: 4px;
  background-color: ${({ show }) => (show ? '#FFD23F' : 'white')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }
`;
const Board = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  bottom: 7px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HideScrollBar = styled.div`
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const IconVideo = styled.img<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  top: 15px;
  z-index: 999;
  cursor: pointer;
  width: 50px;
  opacity: 0.7;
`;

interface videoData {
  url: any;
  id: number;
  isLinkYoutube: boolean;
  /** 'banner' desenha uma arte animada em vez de tocar um vídeo. */
  type?: 'video' | 'banner';
  alt?: string;
}

const VIDEO_CONFIG: videoData[] = [
  {
    url: newRaritiesBanner,
    id: 0,
    isLinkYoutube: false,
    type: 'banner',
    alt: 'New rarities: Mega, Super Mega, Mystic and Super Mystic',
  },
  {
    url: 'https://youtu.be/hRKAZwEBwYs?rel=0',
    id: 1,
    isLinkYoutube: false,
  },
  {
    url: 'https://www.youtube.com/watch?v=FWW1P81hWME?rel=0',
    id: 2,
    isLinkYoutube: true,
  },
  {
    url: 'https://www.youtube.com/watch?v=oopoSExQTD4?rel=0',
    id: 3,
    isLinkYoutube: true,
  },
  {
    url: 'https://www.youtube.com/watch?v=M-RwGuBTYek',
    id: 4,
    isLinkYoutube: true,
  },
];

type Props = {
  id: string;
  content?: ReactElement;
  isPageWorldCup?: boolean;
  setShowInVideo?: (isShow: boolean) => void;
  show: boolean;
};

type ScrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const Hero: React.FC<Props> = ({
  id,
  isPageWorldCup = false,
  show,
  setShowInVideo = () => {},
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [dragDistance, setDragDistance] = useState(0);
  const [keyVisible, setKeyVisibe] = useState(0);
  const apiRef = useRef({} as ScrollVisibilityApiType);
  const dragState = useRef(new DragDealer());
  const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe();
  const [isShowIconVideo, setShowIconVideo] = useState(true);
  const slides = VIDEO_CONFIG;

  useEffect(() => {
    const handleInteraction = () => {
      setLastInteractionTime(Date.now());
      setIsInteracting(true);
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.addEventListener('scroll', handleInteraction);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastInteractionTime;
      if (elapsedTime >= 4000) {
        setIsInteracting(false);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [lastInteractionTime]);

  const setVideoVisible = (key: number) => {
    setKeyVisibe(key);
    setShowIconVideo(slides[key]?.isLinkYoutube ?? false);
  };

  const selectVideo = (id: number) => {
    const itemElement = apiRef.current?.getItemByIndex(id);
    if (itemElement !== null) {
      apiRef.current?.scrollToItem?.(itemElement);
    }
  };

  const openVideo = (id: number) => {
    const link = slides.find((v) => v.id == id);
    if (link) {
      window.open(link.url);
    }
  };

  const onEnded = (key: number) => {
    if (key >= slides.length - 1) {
      selectVideo(0);
    } else {
      apiRef.current?.scrollNext();
    }
  };

  const handleDrag =
    ({ scrollContainer }: ScrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragState.current.dragMove(ev, (posDiff: number) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
          setDragDistance(posDiff);
        }
      });

  const onDragEnd =
    ({ scrollContainer }: ScrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragState.current.dragStop(ev, (pos) => {
        let delta = dragDistance;
        if (delta < 0) {
          if (keyVisible > 0) {
            apiRef.current?.scrollPrev();
          } else {
            selectVideo(0);
          }
          return;
        } else {
          if (keyVisible < slides.length - 1) {
            apiRef.current?.scrollNext();
          } else {
            selectVideo(slides.length - 1);
          }
        }
      });

  function touchEnd() {
    const maxKey = slides.length + 1;
    onTouchEnd(apiRef.current, keyVisible, maxKey);
  }

  return (
    <section
      id={id}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={touchEnd}
    >
      <Contain>
        <div
          className="video-responsive"
          style={{
            marginTop: '-4%',
          }}
        >
          <HideScrollBar>
            <div onMouseUp={() => onDragEnd(apiRef.current)}>
              <ScrollMenu
                onMouseDown={() => dragState.current.dragStart}
                onMouseUp={onDragEnd}
                onMouseMove={handleDrag}
                apiRef={apiRef}
              >
                {slides.map((data) =>
                  data.type === 'banner' ? (
                    <BannerSlide
                      key={data.url}
                      src={data.url}
                      alt={data.alt}
                      itemId={`${data.id}`}
                      setVisible={() => {
                        setVideoVisible(data.id);
                      }}
                      onEnded={() => onEnded(data.id)}
                    />
                  ) : (
                    <Video
                      isMuted={isMuted}
                      url={data.url}
                      key={data.url}
                      itemId={`${data.id}`}
                      setVisible={() => {
                        setVideoVisible(data.id);
                      }}
                      onEnded={() => onEnded(data.id)}
                      isLinkYoutube={data.isLinkYoutube}
                    ></Video>
                  ),
                )}
              </ScrollMenu>
            </div>
          </HideScrollBar>
        </div>
        <IconVideo
          show={isInteracting && isShowIconVideo}
          src={isMuted ? mutedImg_1 : mutedImg_2}
          style={{
            right: '70px',
          }}
          onClick={() => setIsMuted(!isMuted)}
        ></IconVideo>
        <IconVideo
          show={isInteracting && isShowIconVideo}
          src={youtubeIcon}
          style={{
            right: '10px',
          }}
          onClick={() => openVideo(keyVisible)}
        ></IconVideo>
        <Board>
          {slides.map((data, index) => (
            <Dot
              key={index}
              show={keyVisible == data.id}
              style={{
                marginLeft: `${index == 0 ? 0 : 20}px`,
              }}
              onClick={() => selectVideo(data.id)}
            />
          ))}
        </Board>
        <Drawer isShow={show} setShowInVideo={setShowInVideo} />
      </Contain>
    </section>
  );
};

export default Hero;
