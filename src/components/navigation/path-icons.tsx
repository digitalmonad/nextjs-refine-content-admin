import { HomeIcon, Layers3Icon } from "lucide-react";

export const pathIconsMap: {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
} = {
  "/blog-posts": HomeIcon,
  "/categories": Layers3Icon,
};
