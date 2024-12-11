"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Ejercicio1 from "./Ejercicio1"
import Ejercicio2 from "./Ejercicio2"
import Ejercicio3 from "./Ejercicio3"
import Ejercicio4 from "./Ejercicio4"
import Ejercicio5 from "./Ejercicio5"
import Ejercicio6 from "./Ejercicio6"

export default function Home() {
  return (
    <div >
      <h1>Ejercicio1</h1>
      <Ejercicio1/>
      <h1>Ejercicio2</h1>
      <Ejercicio2/>
      <h1>Ejercicio3</h1>
      <Ejercicio3/>
      <h1>Ejercicio4</h1>
      <Ejercicio4/>
      <h1>Ejercicio5</h1>
      <Ejercicio5/>
      <h1>Ejercicio6</h1>
      <Ejercicio6/>
    </div>

  );
}
