import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

const DATA_ANIVERSARIO = new Date("2026-01-14");

const FOTOS = [
  require("../assets/images/Foto1.jpeg"),
  require("../assets/images/Foto2.jpeg"),
  require("../assets/images/Foto3.jpeg"),
  require("../assets/images/Foto4.jpeg"),
  require("../assets/images/Foto5.jpeg"),
  require("../assets/images/Foto6.jpeg"),
  require("../assets/images/Foto7.jpeg"), // 💍 FOTO FINAL
];

export default function Home() {
  const [agora, setAgora] = useState(new Date());
  const animFinal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const diffMs = DATA_ANIVERSARIO.getTime() - agora.getTime();
  const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  function fotosLiberadas() {
    if (diasRestantes <= 0) return 7;
    if (diasRestantes === 1) return 6;
    if (diasRestantes === 2) return 4;
    return 2;
  }

  const qtd = fotosLiberadas();
  const diaEspecial = diasRestantes <= 0;

  useEffect(() => {
    if (diaEspecial) {
      Animated.timing(animFinal, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    }
  }, [diaEspecial]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.titulo}>💖 Nosso Amor 💖</Text>

      <Text style={styles.texto}>
        A gente tá junto desde{"\n"}
        <Text style={styles.destaque}>17/05/2025</Text>
      </Text>

      {!diaEspecial ? (
        <Text style={styles.contador}>
          Faltam <Text style={styles.dias}>{diasRestantes}</Text> dias
        </Text>
      ) : (
        <Text style={styles.contadorEspecial}>
          🎉 Feliz 8 meses, meu amor 🎉
        </Text>
      )}

      <View style={styles.galeria}>
        {FOTOS.slice(0, qtd).map((foto, index) => {
          const ultima = index === 6 && diaEspecial;

          if (ultima) {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.blocoFinal,
                  {
                    opacity: animFinal,
                    transform: [
                      {
                        scale: animFinal.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.85, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Image source={foto} style={styles.fotoFinal} />

                <View style={styles.overlay}>
                  <Text style={styles.mensagemFinal}>
                    Quando a gente foi àquele casamento, eu entendi que não era
                    só sobre eles.{"\n\n"}
                    Era sobre o que eu imagino pra nós. Sobre te olhar desse
                    jeito, escolher você todos os dias e sonhar com um futuro
                    inteiro ao seu lado.{"\n\n"}
                    Logo sera a nossa vez meu amor juntos, do começo ao
                    “para sempre”. 💍❤️
                  </Text>
                </View>
              </Animated.View>
            );
          }

          return (
            <Image key={index} source={foto} style={styles.foto} />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff4d6d",
    padding: 20,
    alignItems: "center",
  },
  titulo: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  texto: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  destaque: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contador: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
  },
  dias: {
    fontSize: 36,
    fontWeight: "bold",
  },
  contadorEspecial: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  galeria: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  foto: {
    width: width * 0.42,
    height: width * 0.42,
    borderRadius: 14,
  },
  blocoFinal: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  fotoFinal: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 18,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 18,
    padding: 20,
    marginTop: -120,
  },
  mensagemFinal: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    lineHeight: 24,
  },
});
