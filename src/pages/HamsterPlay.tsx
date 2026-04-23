import HamsterKombat from "@/components/hamster/HamsterKombat";
import { useEffect } from "react";

const HamsterPlay = () => {
  useEffect(() => {
    document.title = "Hamster Kombat — Play";
  }, []);
  return <HamsterKombat />;
};

export default HamsterPlay;
