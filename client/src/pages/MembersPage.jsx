import CTASection from '../components/CTASection'
import MemberCard from '../components/MemberCard'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import { members } from '../data/members'

export default function MembersPage() {
  return (
    <div>
      <Seo
        title="Membri NorthSideCrew | Comunitate Auto"
        description="Descopera membrii comunitatii NorthSideCrew si masinile care definesc identitatea unei comunitati auto premium din Romania."
        path="/members"
        ogTitle="Membri NorthSideCrew | Comunitate Auto"
        ogDescription="Vezi membrii NorthSideCrew si proiectele auto care construiesc comunitatea."
        image="https://northsidecrew.ro/members/andrei-daniel-bmw.jpg"
      />
      <PageHero
        eyebrow="Membri"
        title="Membrii comunității"
        description="NorthSideCrew este format din oameni care împărtășesc aceeași pasiune pentru mașini."
      />

      <section className="section-space">
        <div className="container-shell">
          <SectionTitle
            eyebrow="Comunitatea"
            title="Fiecare membru aduce ceva unic, iar fiecare mașină spune o poveste."
            description="De la build-uri impresionante până la mașini de zi cu zi transformate prin pasiune și dedicare, membrii noștri reprezintă esența comunității NorthSideCrew."
          />
          <div className="members-grid">
            {members.map((member) => (
              <Reveal key={member.id} className="h-full">
                <MemberCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Vrei să îți prezinți mașina în comunitatea NorthSideCrew?"
        description="Folosește pagina de contact pentru a intra în legătură cu noi pentru evenimente, apariții sau viitoare prezentări de membri."
        primaryLabel="Contactează-ne"
        primaryTo="/contact"
        secondaryLabel="Vezi Evenimentele"
        secondaryTo="/events"
      />
    </div>
  )
}
