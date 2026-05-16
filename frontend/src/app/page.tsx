import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Crosshair,
  Dumbbell,
  Instagram,
  Lightbulb,
  Medal,
  MessageCircle,
  Shield,
  Target,
  Trophy,
  Users
} from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/sections/contact-form";
import { TestimonialsSlider } from "@/components/sections/testimonials-slider";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";

const benefits = [
  {
    title: "Tecnica",
    description: "Dominio del balon, controles, perfiles y recursos para resolver bajo presion.",
    icon: Target
  },
  {
    title: "Mentalidad",
    description: "Entrenamos enfoque, resiliencia y capacidad para competir sin miedo.",
    icon: Brain
  },
  {
    title: "Creatividad",
    description: "Situaciones abiertas para decidir, improvisar y entender el juego.",
    icon: Lightbulb
  },
  {
    title: "Disciplina",
    description: "Rutinas simples, exigentes y repetibles para construir habitos ganadores.",
    icon: Crosshair
  },
  {
    title: "Liderazgo",
    description: "Formamos jugadores que comunican, ordenan y elevan a su equipo.",
    icon: Medal
  },
  {
    title: "Confianza",
    description: "Cada sesion busca que el jugador se atreva a intentar y vuelva a creer.",
    icon: Shield
  }
];

const trainingPoints = [
  "Diagnostico del nivel tecnico y coordinativo",
  "Ejercicios progresivos con balon y oposicion",
  "Toma de decisiones en situaciones reales",
  "Seguimiento de confianza, disciplina y caracter",
  "Sesiones adaptadas por edad, objetivo y posicion"
];

const values = [
  {
    title: "Mision",
    description: "Llegar a ser entrenador en un gran club y dejar huella en el futbol.",
    icon: Trophy
  },
  {
    title: "Vision",
    description: "Construir la escuela de futbol mas influyente y respetada.",
    icon: Dumbbell
  },
  {
    title: "Valores",
    description: "Pasion, compromiso, disciplina y amor por el desarrollo.",
    icon: Users
  }
];

const testimonials = [
  {
    quote:
      "Mi hijo ha mejorado su tecnica y su confianza increiblemente. Ahora disfruta mas el futbol y se atreve a intentarlo.",
    author: "Papa de Mateo",
    role: "Jugador de 11 anos"
  },
  {
    quote:
      "El Metodo Aristi no solo mejora jugadores, tambien forma su mente. Mi hijo es mas disciplinado y seguro.",
    author: "Mama de Emiliano",
    role: "Jugador de 13 anos"
  },
  {
    quote:
      "Los entrenamientos son exigentes, dinamicos y diferentes. Se nota la pasion y la experiencia en cada sesion.",
    author: "Papa de Santiago",
    role: "Jugador de 10 anos"
  },
  {
    quote:
      "Aprendi a controlar mejor el balon y a tomar decisiones mas rapido. Ahora entro a la cancha con mas confianza.",
    author: "Samuel",
    role: "Jugador de 12 anos"
  },
  {
    quote:
      "Nos gusta que cada sesion tenga una intencion. No es entrenar por entrenar, es formar habitos.",
    author: "Mama de Luciana",
    role: "Jugadora de 9 anos"
  }
];

const trainingImages = [
  {
    title: "Tecnica con balon",
    description: "Controles, perfiles, conduccion y recursos para jugar bajo presion.",
    src: "/images/provided/cones-ball-drill.svg"
  },
  {
    title: "Coordinacion",
    description: "Circuitos de pies, cambios de ritmo y movimiento con balon.",
    src: "/images/suggested/coordination-session.svg"
  },
  {
    title: "Decision en juego",
    description: "Situaciones reales para decidir rapido, crear ventaja y competir.",
    src: "/images/suggested/game-decision.svg"
  }
];

const galleryItems = [
  {
    title: "Charla tecnica",
    description: "Preparacion mental antes de entrar al campo.",
    src: "/images/provided/coach-kids-session.svg",
    size: "h-[460px]"
  },
  {
    title: "Conduccion con conos",
    description: "Control de balon, ritmo y precision.",
    src: "/images/provided/cones-ball-drill.svg",
    size: "h-[560px]"
  },
  {
    title: "Coordinacion",
    description: "Circuitos para pies rapidos y dominio corporal.",
    src: "/images/suggested/coordination-session.svg",
    size: "h-[420px]"
  },
  {
    title: "Decision en juego",
    description: "Acciones con lectura, ventaja y atrevimiento.",
    src: "/images/suggested/game-decision.svg",
    size: "h-[520px]"
  },
  {
    title: "Tecnica individual",
    description: "Recursos para competir bajo presion.",
    src: "/images/suggested/technique-session.svg",
    size: "h-[440px]"
  },
  {
    title: "Entrenamiento guiado",
    description: "Metodo, correccion y proposito en cada sesion.",
    src: "/images/provided/coach-kids-session.svg",
    size: "h-[500px]"
  }
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-screen overflow-hidden bg-brand-black text-brand-white">
        <Image
          src="/images/hero-aristi.svg"
          alt="Jugador entrenando futbol de noche con iluminacion neon"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,3,3,0.95)_0%,rgba(1,3,3,0.82)_35%,rgba(1,3,3,0.36)_68%,rgba(1,3,3,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(0,229,229,0.18),transparent_30%),linear-gradient(180deg,rgba(1,3,3,0.22),#010303_98%)]" />
        <div className="absolute left-0 top-[18%] h-72 w-px bg-brand-cyan/60 shadow-glow md:left-[47%]" />
        <div className="absolute bottom-16 right-8 hidden w-36 animate-float border-l border-brand-cyan/45 pl-5 lg:block">
          <p className="font-display text-4xl leading-none neon-text">Juega sin miedo.</p>
          <p className="mt-3 text-xs font-black uppercase leading-5 tracking-wide text-brand-white/68">
            Entrena con proposito.
          </p>
        </div>

        <Container className="relative z-10 flex min-h-screen items-center pb-16 pt-28 md:pb-20 md:pt-32">
          <div className="max-w-4xl animate-float">
            <p className="mb-5 text-[0.72rem] font-black uppercase tracking-[0.34em] text-brand-cyan sm:text-xs">
              Metodo Aristi
            </p>
            <h1 className="font-display text-6xl leading-[0.88] tracking-normal sm:text-7xl md:text-8xl lg:text-9xl">
              Formamos jugadores
              <span className="block neon-text">tecnicos, creativos</span>
              y sin miedo.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-brand-white/78 sm:text-base md:text-lg md:leading-8">
              Entrenamientos con balon y coordinacion para desarrollar jugadores que se atreven,
              deciden y marcan la diferencia.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                size="lg"
                icon={<MessageCircle size={18} />}
                className="animate-pulse-glow"
              >
                Agenda tu clase
              </ButtonLink>
              <ButtonLink
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
                icon={<Instagram size={18} />}
              >
                Instagram
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-brand-steel">Clases para ninos y jovenes de 6 a 18 anos</p>
          </div>
        </Container>
      </section>

      <section id="beneficios" className="relative overflow-hidden border-y border-brand-line bg-brand-graphite py-20">
        <div className="absolute inset-0 bg-field-lines bg-[length:76px_76px] opacity-35" />
        <div className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 bg-[radial-gradient(circle,rgba(0,240,236,0.14),transparent_68%)]" />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <SectionTitle
              eyebrow="Beneficios"
              title="No solo entrenamos futbol,"
              accent="formamos caracter."
              description="La metodologia combina tecnica, toma de decisiones y formacion personal para que cada jugador compita con identidad."
            />
            <p className="max-w-2xl text-sm leading-7 text-brand-steel lg:justify-self-end">
              Cada card representa un eje de trabajo dentro del Metodo Aristi. El objetivo es que
              el jugador mejore con el balon, pero tambien aprenda a liderar, confiar y sostener
              su disciplina.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <Card
                  key={benefit.title}
                  className="group brand-scan min-h-60 animate-card-rise overflow-hidden p-6 hover:-translate-y-2 hover:shadow-glow-strong"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-7 flex items-center justify-between">
                        <span className="grid h-14 w-14 place-items-center rounded-sm border border-brand-cyan/45 bg-brand-cyan/10 text-brand-cyan shadow-glow transition duration-300 group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-brand-black">
                          <Icon size={28} strokeWidth={1.8} />
                        </span>
                        <span className="font-display text-6xl leading-none text-brand-cyan/16 transition group-hover:text-brand-cyan/32">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-4xl leading-none text-brand-white">
                        {benefit.title}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-brand-steel">{benefit.description}</p>
                    </div>
                    <div className="mt-8 h-px w-full bg-gradient-to-r from-brand-cyan via-brand-cyan/35 to-transparent opacity-60 transition group-hover:opacity-100" />
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="metodo" className="relative overflow-hidden bg-dark-section py-24">
        <div className="absolute inset-0 bg-field-lines bg-[length:90px_90px] opacity-25" />
        <Container className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="scroll-reveal relative min-h-[520px] overflow-hidden rounded-sm border border-brand-line bg-brand-graphite shadow-soft">
            <Image
              src="/images/provided/coach-kids-session.svg"
              alt="Entrenador explicando metodologia a jugadores jovenes"
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.14),rgba(0,0,0,0.72)),linear-gradient(180deg,transparent,rgba(0,0,0,0.78))]" />
            <div className="absolute bottom-7 left-7 right-7">
              <div className="mb-4 h-px w-28 bg-brand-cyan shadow-glow" />
              <p className="max-w-md font-display text-5xl leading-none text-brand-white">
                Entrenar con
                <span className="block neon-text">proposito claro.</span>
              </p>
            </div>
          </div>

          <div className="scroll-reveal">
            <SectionTitle
              eyebrow="Sobre el metodo"
              title="Metodo deportivo"
              accent="con estructura."
              description="La metodologia combina tecnica individual, coordinacion, toma de decisiones y mentalidad competitiva. Cada entrenamiento tiene un objetivo claro y una progresion medible."
            />
            <ul className="mt-8 grid gap-3">
              {trainingPoints.map((point) => (
                <li
                  key={point}
                  className="group flex items-start gap-3 rounded-sm border border-brand-line bg-white/[0.025] p-4 text-sm text-brand-white/78 transition hover:border-brand-cyan/55 hover:bg-brand-cyan/5 hover:shadow-glow"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-brand-cyan transition group-hover:scale-110"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                icon={<MessageCircle size={18} />}
              >
                Agenda tu clase
              </ButtonLink>
              <ButtonLink href="#galeria" variant="outline" icon={<ArrowRight size={17} />}>
                Ver entrenamientos
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section id="sobre-mi" className="border-y border-brand-line bg-brand-black py-20">
        <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-sm bg-brand-graphite">
            <Image
              src="/images/provided/coach-kids-session.svg"
              alt="Entrenador reunido con jugadores jovenes en cancha"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.74))]" />
            <div className="absolute bottom-8 left-8 right-8 h-px bg-brand-cyan/65 shadow-glow" />
          </div>
          <div>
            <SectionTitle
              eyebrow="Mas que un entrenador"
              title="Soy un formador"
              accent="de suenos."
              description="Mi mision es ayudar a cada jugador a crecer con identidad, confianza y disciplina. Cada sesion busca formar criterio, caracter y amor por el juego."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <Card key={value.title} className="p-5">
                    <Icon className="text-brand-cyan" size={28} />
                    <h3 className="mt-4 font-display text-3xl text-brand-white">{value.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-brand-steel">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section id="galeria" className="relative overflow-hidden bg-brand-black py-24">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,236,0.16),transparent_62%)]" />
        <Container>
          <div className="scroll-reveal mb-12 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <SectionTitle
              eyebrow="Galeria de entrenamientos"
              title="Sesiones con balon,"
              accent="ritmo y proposito."
              description="Un recorrido visual por la energia del Metodo Aristi: tecnica, coordinacion, decision y formacion en cancha."
            />
            <p className="max-w-2xl text-sm leading-7 text-brand-steel lg:justify-self-end">
              Cada imagen muestra un momento clave del proceso: correccion, repeticion,
              intensidad y confianza para competir con personalidad.
            </p>
          </div>

          <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
            {galleryItems.map((item, index) => (
              <article
                key={item.title}
                className={`scroll-reveal group relative mb-5 break-inside-avoid overflow-hidden rounded-sm border border-brand-line bg-brand-graphite shadow-soft transition duration-500 hover:-translate-y-2 hover:border-brand-cyan/70 hover:shadow-glow-strong ${item.size}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Image
                  src={item.src}
                  alt={item.description}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.32)_45%,rgba(0,0,0,0.94)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(0,240,236,0.08)_0%,rgba(0,0,0,0.28)_42%,rgba(0,0,0,0.95)_100%)]" />
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-px bg-brand-cyan shadow-glow" />
                  <div className="absolute inset-y-0 right-0 w-px bg-brand-cyan/70 shadow-glow" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-4 h-px w-20 bg-brand-cyan shadow-glow transition group-hover:w-32" />
                  <h3 className="font-display text-4xl leading-none text-brand-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-steel">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="testimonios" className="relative overflow-hidden bg-brand-graphite py-24">
        <div className="absolute inset-0 bg-field-lines bg-[length:80px_80px] opacity-25" />
        <div className="absolute left-1/2 top-0 h-72 w-[72%] -translate-x-1/2 bg-[radial-gradient(circle,rgba(0,240,236,0.16),transparent_70%)]" />
        <Container>
          <SectionTitle
            align="center"
            eyebrow="Testimonios"
            title="Confianza de padres"
            accent="y jugadores."
            description="Historias de progreso, disciplina y seguridad dentro del proceso Metodo Aristi."
            className="relative max-w-2xl"
          />
          <div className="relative mt-12">
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </Container>
      </section>

      <section id="entrenamientos" className="bg-brand-black py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
          <SectionTitle
            title="Hoy entrenas."
            accent="Manana lideras."
            description="Cada entrenamiento te acerca a tu mejor version como jugador y como persona."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {trainingImages.map((item, index) => (
              <div
                key={item.title}
                className="relative min-h-64 overflow-hidden rounded-sm border border-brand-line bg-brand-graphite p-5"
              >
                <Image
                  src={item.src}
                  alt={`${item.title} en entrenamiento Metodo Aristi`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.86))]" />
                <div className="relative flex h-full flex-col justify-between">
                  <span className="font-display text-7xl text-brand-cyan/30">0{index + 1}</span>
                  <h3 className="font-display text-4xl leading-none text-brand-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="contacto" className="relative isolate min-h-screen overflow-hidden bg-brand-black py-24">
        <Image
          src="/images/provided/cones-ball-drill.svg"
          alt="Entrenamiento de futbol con balon y conos"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94),rgba(0,0,0,0.62),rgba(0,0,0,0.9)),linear-gradient(180deg,rgba(0,0,0,0.34),#000)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,240,236,0.16),transparent_34%)]" />
        <Container className="relative z-10 flex min-h-[calc(100vh-12rem)] items-center">
          <div className="scroll-reveal max-w-5xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-brand-cyan">
              Tu momento es ahora
            </p>
            <h2 className="font-display text-6xl leading-[0.88] text-brand-white sm:text-7xl lg:text-9xl">
              Hoy entrenas.
              <span className="block neon-text">Manana lideras.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-brand-white/76">
              Agenda una clase, conoce el proceso y empieza a construir una version mas tecnica,
              segura y disciplinada dentro de la cancha.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                size="lg"
                icon={<MessageCircle size={22} />}
                className="h-16 px-8 text-base"
              >
                Agenda tu clase
              </ButtonLink>
              <ButtonLink
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
                icon={<Instagram size={22} />}
                className="h-16 px-8 text-base"
              >
                Instagram
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section id="contacto-info" className="bg-brand-black pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-sm border border-brand-cyan/45 bg-brand-graphite p-8 shadow-glow md:p-10">
            <div className="absolute inset-0 bg-neon-radial" />
            <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-[0.72rem] font-black uppercase tracking-[0.32em] text-brand-cyan">
                  Formulario de contacto
                </p>
                <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none text-brand-white sm:text-6xl">
                  Cuéntanos sobre
                  <span className="block neon-text">el jugador.</span>
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-brand-steel">
                  Deja tus datos y nos pondremos en contacto para orientarte sobre el entrenamiento
                  ideal según edad, nivel y objetivo.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
