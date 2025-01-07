import type { StaticImageData } from "next/image";
import Titus from "@/public/titus.jpg";
import TitusGif from "@/public/Titus.webp";
import Me from "@/public/me.jpg";
import MeGif from "@/public/me.webp";
import Pranav from "@/public/pranav.jpg";
import Erick from "@/public/erick.jpg";
import Vivian from "@/public/Vivian Mosomi.jpg";
import vivian from "@/public/vivian.webp";
import Kathryn from "@/public/Kathryn Nkini.jpg";
import kathryn from "@/public/Kathryn.webp";
import Beth from "@/public/Beth Awino.jpg";
import beth from "@/public/Beth.webp";
import Kisang from "@/public/Cynthia Kisang.jpg";
import kisang from "@/public/Kisang.webp";
import Odundo from "@/public/odundo.jpg";

interface TeamProps {
  name: string;
  photo: StaticImageData;
  gifUrl: StaticImageData;
  position: string;
}

export const team: TeamProps[] = [
  {
    name: "Titus Gicharu",
    photo: Titus,
    gifUrl: TitusGif,
    position: "Co-creator - Founder & CEO",
  },
  {
    name: "Charles Nderitu",
    photo: Me,
    gifUrl: MeGif,
    position: "Co-creator - VP Engineering",
  },
  {
    name: "Pranav Dudhane",
    photo: Pranav,
    gifUrl: MeGif,
    position: "Co-creator - Full-Stack Developer",
  },
  {
    name: "Erick Otuoma",
    photo: Erick,
    gifUrl: vivian,
    position: "Co-creator - Developer",
  },
  {
    name: "Charles Odundo",
    photo: Odundo,
    gifUrl: MeGif,
    position: "Co-creator - School Feeding Program Admin",
  },
  {
    name: "Vivian Mosomi",
    photo: Vivian,
    gifUrl: vivian,
    position: "Co-creator - Cause Starter",
  },
  {
    name: "Kathryn Nkini",
    photo: Kathryn,
    gifUrl: kathryn,
    position: "Co-creator - Cause Starter",
  },
  {
    name: "Beth Awino",
    photo: Beth,
    gifUrl: beth,
    position: "Co-creator - Cause Starter",
  },
  {
    name: "Cynthia Kisang",
    photo: Kisang,
    gifUrl: kisang,
    position: "Co-creator - Cause Starter",
  },
];
