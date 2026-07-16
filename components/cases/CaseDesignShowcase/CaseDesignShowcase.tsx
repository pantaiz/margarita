import CaseImage from '@/components/cases/CaseImage/CaseImage';
import CasePrototypeVideo from '@/components/cases/CasePrototypeVideo/CasePrototypeVideo';
import type { CaseDesignBlock } from '@/lib/types';
import { fixHangingPrepositions } from '@/lib/typography';
import styles from './CaseDesignShowcase.module.css';

type CaseDesignShowcaseProps = {
  blocks: CaseDesignBlock[];
};

export default function CaseDesignShowcase({ blocks }: CaseDesignShowcaseProps) {
  return (
    <div className={styles.showcase}>
      {blocks.map((block) => {
        const images = block.images ?? [];
        const videos = block.videos ?? [];
        const mediaCount = images.length + videos.length;
        const multi = mediaCount > 1;

        return (
          <article key={block.id} className={styles.block}>
            <div className={styles.info}>
              <h3 className={styles.title}>
                {fixHangingPrepositions(block.title)}
              </h3>
              <p className={styles.description}>
                {fixHangingPrepositions(block.description)}
              </p>
            </div>

            {videos.length > 0 && (
              <div
                className={`${styles.videos} ${multi ? styles.videosMulti : ''}`}
              >
                {videos.map((video) => (
                  <div key={video.src} className={styles.videoWrap}>
                    {video.caption && (
                      <p className={styles.videoCaption}>
                        {fixHangingPrepositions(video.caption)}
                      </p>
                    )}
                    <div className={styles.videoPlayer}>
                      <CasePrototypeVideo
                        src={video.src}
                        alt={video.alt}
                        poster={video.poster}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && (
              <div
                className={`${styles.screens} ${
                  multi || images.length > 1 ? styles.screensMulti : ''
                }`}
              >
                {images.map((image) => (
                  <div key={image.src} className={styles.screenWrap}>
                    <CaseImage
                      src={image.src}
                      alt={image.alt}
                      className={styles.screen}
                    />
                  </div>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
