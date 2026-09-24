import { TextLink } from "@/components/ui";

export default function NotFound() {
  return <section className="page-hero page-hero-full" data-scene="charcoal">
    <div className="wrap"><p className="eyebrow">404</p><h1 className="display page-title">Page not found</h1><div style={{ marginTop: 40 }}><TextLink href="/">Back to home</TextLink></div></div>
  </section>;
}
