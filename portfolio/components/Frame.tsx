import Image from "next/image";

interface FrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** A browser-style frame for real screenshots and analytical outputs. */
export function Frame({ src, alt, width, height, label, sizes, priority, className, style }: FrameProps) {
  return (
    <div className={`frame ${className ?? ""}`} style={style}>
      <div className="frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        {label ? <span>{label}</span> : null}
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes ?? "(max-width: 900px) 100vw, 700px"} priority={priority} />
    </div>
  );
}
