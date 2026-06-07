import Image from 'next/image';
import {
  CalendarCheck,
  Dumbbell,
  Facebook,
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
import { createWhatsappUrl, facebookUrl, instagramUrl, tiktokUrl } from '@/lib/contact';

const accent = 'text-primary cyan-glow';
const evaluationWhatsappUrl = createWhatsappUrl('Quiero mi evaluacion tecnica');

const problems = [
  {
    icon: MessageCircle,
    title: 'Entrena, pero no despega.',
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
    title: 'Agenda tu evaluación técnica',
    text: 'Elige el dia y horario que mejor te convenga.',
    icon: CalendarCheck,
  },
  {
    number: '2',
    title: 'Evaluamos su nivel',
    text: 'Revisamos tecnica, confianza y forma de competir.',
    icon: ShieldCheck,
  },
  {
    number: '3',
    title: 'Entrenamos para transformar',
    text: 'Mejoramos habitos, mentalidad y rendimiento en cancha.',
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

const galleryImages = [
  '/images/metodo-aristi-gallery-1.jpeg',
  '/images/metodo-aristi-gallery-2.jpeg',
  '/images/metodo-aristi-gallery-3.jpeg',
  '/images/metodo-aristi-gallery-4.jpeg',
  '/images/metodo-aristi-gallery-5.jpeg',
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#07080a] text-white">
      <LandingHeader />
      <section className="relative min-h-[760px] overflow-hidden">
        <Image
          src="/images/metodo-aristi-hero.jpeg"
          alt="Entrenamiento Metodo Aristi"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-black/50" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-5 py-28 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-primary">
              Metodo Aristi
            </p>
            <h1 className="floating-title text-5xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
              Formamos jugadores tecnicos, creativos y seguros para competir{' '}
              <span className={accent}>sin miedo.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base font-medium leading-7 text-white/85">
              Desarrollamos tecnica, confianza y mentalidad mediante
              entrenamientos especializados con balon para niños de 18 meses a 16 años.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md px-6 font-black uppercase">
                <a href={evaluationWhatsappUrl} target="_blank" rel="noreferrer">
                  <CalendarCheck className="h-4 w-4" />
                  Agenda tu clase de prueba
                </a>
              </Button>
            </div>
            <p className="mt-3 text-xs font-semibold text-white/65">
              Clases para niños de 18 meses a 16 años.
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

      <section id="metodo" className="overflow-hidden bg-[#f4f5f7] text-black">
        <div className="mx-auto grid max-w-7xl items-stretch lg:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-10">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-primary">
              Nuestro metodo
            </p>
            <h2 className="mt-3 max-w-xl text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl">
              Mas que entrenamientos, formamos jugadores que juegan{' '}
              <span className={accent}>sin miedo.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm font-semibold leading-6 text-black/65">
              Nuestro enfoque combina tecnica, creatividad, inteligencia de
              juego y mentalidad para desarrollar jugadores completos dentro y
              fuera de la cancha.
            </p>
            <ul className="mt-6 space-y-3">
              {methodItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-bold text-black/80">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 w-fit rounded-md font-black uppercase">
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                Conoce más sobre nuestro método
              </a>
            </Button>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <Image
              src="/images/metodo-aristi-method.jpeg"
              alt="Equipo Metodo Aristi"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#f4f5f7] via-[#f4f5f7]/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f4f5f7]/35 to-transparent lg:hidden" />
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

      <section id="galeria" className="bg-[#07080a] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-primary">
            Ver es creer
          </p>
          <h2 className="floating-title mt-3 text-center text-3xl font-black uppercase tracking-normal">
            Ellos ya juegan sin miedo
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-5">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative h-44 overflow-hidden">
                <Image
                  src={image}
                  alt="Galeria de entrenamientos"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="relative overflow-hidden border-t border-white/10">
        <Image
          src="/images/metodo-aristi-contact.jpeg"
          alt="Evaluacion tecnica Metodo Aristi"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/85 via-transparent to-black/20" />
        <div className="relative mx-auto min-h-[460px] max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <h2 className="floating-title text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl">
              Tu hijo puede jugar con mas tecnica,{' '}
              <span className={accent}>confianza y valentia.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-6 text-white/75">
              Agenda hoy su evaluación técnica y da el primer paso hacia su mejor version.
            </p>
            <Button asChild className="mt-7 h-12 rounded-md px-6 font-black uppercase shadow-[0_0_26px_hsl(var(--primary)/0.35)]">
              <a href={evaluationWhatsappUrl} target="_blank" rel="noreferrer">
                <CalendarCheck className="h-4 w-4" />
                Agenda tu clase de prueba
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-5 text-xs text-white/55 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/metodo-aristi-logo.jpeg"
              alt="Metodo Aristi"
              width={52}
              height={52}
              className="h-14 w-14 rounded-md object-cover"
            />
            <p>2026 Metodo Aristi Escuela de Futbol. Todos los derechos reservados.</p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a className="flex items-center gap-2 transition hover:text-primary" href={evaluationWhatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a className="flex items-center gap-2 transition hover:text-primary" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
              @metodoaristi
            </a>
            <a className="transition hover:text-primary" href={tiktokUrl} target="_blank" rel="noreferrer">
              TikTok: @metodoaristi
            </a>
            <a className="flex items-center gap-2 transition hover:text-primary" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
              Metodo Aristi
            </a>
            <span>Politica de privacidad</span>
            <span>Terminos y condiciones</span>
          </div>
        </div>
      </footer>
      <a
        href={evaluationWhatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.55)] transition hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </main>
  );
}
