import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

/*
 * Idiomas do site: inglês e português, sem biblioteca.
 *
 * - Na primeira visita o idioma vem do navegador (qualquer variante "pt" →
 *   português; o resto → inglês).
 * - A escolha da pessoa no seletor fica guardada no localStorage e vence a
 *   detecção nas próximas visitas.
 *
 * Cada componente declara os próprios textos com `defineText(en, pt)`: o
 * TypeScript obriga o português a ter exatamente as mesmas chaves do inglês.
 * Conteúdo maior (FAQ, guias) tem um arquivo de dados por idioma.
 */

export type Lang = 'en' | 'pt';
export const LANGS: { id: Lang; label: string; name: string }[] = [
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'pt', label: 'PT', name: 'Português' },
];

const STORAGE_KEY = 'bc-lang';

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'pt') return saved;
  } catch (e) {
    // sem storage (aba privada, bloqueado): segue para a detecção
  }
  const prefs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  return prefs.some((l) => l?.toLowerCase().startsWith('pt')) ? 'pt' : 'en';
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => undefined,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch (e) {
      // sem storage: vale só para esta visita
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);

/** Textos de um componente nos dois idiomas; o português precisa ter as mesmas chaves. */
export function defineText<T>(en: T, pt: T): Record<Lang, T> {
  return { en, pt };
}

/** Os textos do idioma atual. */
export function useText<T>(text: Record<Lang, T>): T {
  return text[useLang().lang];
}
