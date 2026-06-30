import NavBrutalist     from './components/NavBrutalist';
import HeroBrutalist    from './components/HeroBrutalist';
import WorkBrutalist    from './components/WorkBrutalist';
import TrackRecord      from './components/TrackRecord';
import OffHours         from './components/OffHours';
import StackBrutalist   from './components/StackBrutalist';
import ContactBrutalist from './components/ContactBrutalist';
import FooterBrutalist  from './components/FooterBrutalist';

export default function Home() {
  return (
    <>
      <NavBrutalist />
      <HeroBrutalist />
      <WorkBrutalist />
      <TrackRecord />
      <OffHours />
      <StackBrutalist />
      <ContactBrutalist />
      <FooterBrutalist />
    </>
  );
}
