import Image from 'next/image';
import {
  ArrowRight,
  CalendarCheck,
  Dumbbell,
  Frown,
  Goal,
  Instagram,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing/landing-header';

const accent = 'text-primary cyan-glow';
const whatsappUrl =
  'https://wa.me/3022243805?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20entrenamientos';

const problems = [
  {
    icon: MessageCircle,
    title: 'Tu hijo entrena, pero no destaca.',
  },
  {
    icon: Frown,
    title: 'Le falta confianza con el balon.',
  },
  {
    icon: Dumbbell,
    title: 'Tiene miedo de equivocarse.',
  },
  {
    icon: Goal,
    title: 'En los partidos desaparece.',
  },
  {
    icon: Trophy,
    title: 'No se atreve a encarar.',
  },
  {
    icon: Users,
    title: 'La escuela tradicional no trabaja detalles tecnicos.',
  },
];

const methodItems = [
  'Entrenamientos especializados con balon',
  'Desarrollo de tecnica individual',
  'Mentalidad ganadora y confianza',
  'Ambiente positivo y motivador',
  'Entrenadores capacitados y apasionados',
];

const steps = [
  {
    number: '1',
    title: 'Agenda tu clase de prueba',
    text: 'Elige el dia y horario que mejor te convenga.',
    icon: CalendarCheck,
  },
  {
    number: '2',
    title: 'Evaluamos su nivel',
    text: 'Revisamos tecnica, y mental del jugador para crear su plan de trabajo.',
    icon: ShieldCheck,
  },
  {
    number: '3',
    title: 'Entrenamos para su transformacion',
    text: 'Entrenamientos enfocados en tecnica, confianza, y mentalidad para que jueguen sin miedo.',
    icon: Dumbbell,
  },
];

const testimonials = [
  {
    quote:
      'Desde que mi hijo entrena aqui se le nota mas seguro. Ahora disfruta cada partido y se atreve a mas.',
    name: 'Paola G.',
    role: 'Mama de Santiago, 10 anos',
  },
  {
    quote:
      'El metodo es diferente. No solo ensenan a tocar el balon, tambien a pensar y competir mejor.',
    name: 'Andres M.',
    role: 'Papa de Mateo, 12 anos',
  },
  {
    quote:
      'Mi hijo era muy timido. Hoy juega con mas tecnica, mas seguridad y mas alegria.',
    name: 'Carolina R.',
    role: 'Mama de Emiliano, 9 anos',
  },
];

const trainingGallery = [
  { title: 'Tecnica individual', position: '18% center' },
  { title: 'Control y conduccion', position: '34% center' },
  { title: 'Coordinacion con balon', position: '50% center' },
  { title: 'Mentalidad competitiva', position: '66% center' },
  { title: 'Entrenamiento personalizado', position: '82% center' },
  { title: 'Confianza en cancha', position: '95% center' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#07080a] text-white">
      <LandingHeader />
      <section className="relative min-h-[760px] overflow-hidden">
        <Image
          src="/images/football-training.jpg"
          alt="Entrenamiento de futbol para ninos"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-black/50" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-5 py-28 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-primary">
              Metodo aristi
            </p>
            <h1 className="floating-title text-5xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
              Formamos jugadores tecnicos, creativos y seguros para competir{' '}
              <span className={accent}>sin miedo.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base font-medium leading-7 text-white/85">
              En el Metodo Aristi Desarrollamos tecnica, confianza y mentalidad mediante
              entrenamientos especializados con balon.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <Button size="lg" className="h-12 w-full rounded-md px-6 font-black uppercase sm:w-auto">
                  <CalendarCheck className="h-4 w-4" />
                  Agenda una clase de prueba
                </Button>
              </a>
              <a href="https://www.instagram.com/metodoaristi" target="_blank" rel="noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-md px-6 font-black uppercase sm:w-auto"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Button>
              </a>
            </div>
            <p className="mt-3 text-xs font-semibold text-white/65">
              Clases para ninos de 6 a 16 anos
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b0c0f] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-primary">
            Entendemos lo que vives
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase tracking-normal sm:text-3xl">
            Te identificas con alguno de estos problemas?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <div key={problem.title} className="flex flex-col items-center gap-3">
                  <Icon className="h-10 w-10 text-primary" strokeWidth={1.7} />
                  <p className="max-w-36 text-sm font-semibold leading-5 text-white/80">
                    {problem.title}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-lg font-black">
            No estas solo. Y tiene solucion.
          </p>
          <p className="mt-1 text-base font-bold text-primary">
            Estamos aqui para ayudarlo a cambiar su juego y su mentalidad.
          </p>
        </div>
      </section>

      <section id="metodo" className="bg-white px-5 py-16 text-black sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[360px] overflow-hidden border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
            <Image
              src="/images/football-training.jpg"
              alt="Metodo de entrenamiento"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-primary">
              Nuestro metodo
            </p>
            <h2 className="floating-title mt-3 text-4xl font-black uppercase leading-none tracking-normal text-black sm:text-5xl">
              Mas que entrenamientos, formamos jugadores que juegan{' '}
              <span className="text-primary cyan-glow">sin miedo.</span>
            </h2>
            <p className="mt-5 text-sm font-semibold leading-6 text-black/68">
              Nuestro enfoque combina tecnica, creatividad, inteligencia de juego y mentalidad para
              desarrollar jugadores completos dentro y fuera de la cancha.
            </p>
            <ul className="mt-6 space-y-3">
              {methodItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-black text-black/80">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex">
              <Button className="rounded-md font-black uppercase">Conoce mas sobre nuestro metodo</Button>
            </a>
          </div>
        </div>
      </section>

      <section id="funciona" className="border-y border-white/10 bg-[#090a0d] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-primary">
            Asi es como funciona
          </p>
          <h2 className="floating-title mt-3 text-center text-3xl font-black uppercase tracking-normal">
            Un proceso simple, efectivo y personalizado
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex gap-5 border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-5xl font-black leading-none text-primary">{step.number}</p>
                    <h3 className="mt-2 text-base font-black uppercase">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="testimonios" className="bg-[#f3f4f6] px-5 py-16 text-black sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-primary">
            Lo que dicen los padres
          </p>
          <h2 className="mt-3 text-center text-3xl font-black uppercase tracking-normal">
            Historias reales, resultados reales
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="border bg-white p-6 shadow-sm">
                <p className="text-4xl font-black leading-none text-primary">"</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-black/70">
                  {testimonial.quote}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-black text-white">
                    {testimonial.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-black">{testimonial.name}</p>
                    <p className="text-xs text-black/55">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="bg-black px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-primary">
            Viven y crecen
          </p>
          <h2 className="floating-title mt-3 text-center text-3xl font-black uppercase tracking-normal">
            Entrenan, compiten y juegan sin miedo
          </h2>
          <div className="mt-9 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-color:#00E5FF_#111]">
            {trainingGallery.map((item) => (
              <article
                key={item.title}
                className="group relative h-72 min-w-[82%] snap-center overflow-hidden border border-white/10 bg-[#0B1220] sm:min-w-[46%] lg:min-w-[31%]"
              >
                <Image
                  src="/images/football-training.jpg"
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                  style={{ objectPosition: item.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-primary">
                    Halcones
                  </p>
                  <h3 className="mt-2 text-2xl font-black uppercase leading-none">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10">
        <Image
          src="/images/football-training.jpg"
          alt="Clase de prueba"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="relative mx-auto grid min-h-[430px] max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.6fr] lg:px-10">
          <div>
            <h2 className="floating-title max-w-2xl text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl">
              Tu hijo puede jugar con mas tecnica,{' '}
              <span className={accent}>confianza y valentia.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-6 text-white/75">
              Agenda hoy su clase de prueba y da el primer paso hacia su mejor version.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <Button size="lg" className="w-full rounded-md font-black uppercase sm:w-auto">
                  <CalendarCheck className="h-4 w-4" />
                  Agenda tu clase de prueba
                </Button>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="w-full rounded-md font-black uppercase sm:w-auto">
                  Escribenos por WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          <div className="justify-self-center text-center lg:justify-self-end">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-white">
              <Trophy className="h-16 w-16" />
            </div>
            <p className="mt-4 text-3xl font-black uppercase">Metodo Aristi</p>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
              Escuela de futbol
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-5 text-xs text-white/55 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>2026 Metodo Aristi Escuela de Futbol. Todos los derechos reservados.</p>
          <div className="flex items-center gap-5">
            <a className="transition hover:text-primary" href="https://www.instagram.com/metodoaristi" aria-label="Instagram" target="_blank" rel="noreferrer">
              <Instagram className="h-4 w-4" />
            </a>
            <a className="transition hover:text-primary" href="https://www.tiktok.com/@metodoaristi" target="_blank" rel="noreferrer">TikTok</a>
            <span>Politica de privacidad</span>
            <span>Terminos y condiciones</span>
          </div>
        </div>
      </footer>
      <a
        href={whatsappUrl}
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.55)] transition hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </main>
  );
}
