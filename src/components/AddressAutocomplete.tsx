import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Suggestion {
  label: string;
  name: string;
  postcode: string;
  city: string;
}

interface AddressAutocompleteProps {
  value: string;
  onAdresseChange: (value: string) => void;
  onCodePostalChange: (value: string) => void;
  onVilleChange: (value: string) => void;
  error?: string;
  id?: string;
}

const AddressAutocomplete = ({
  value,
  onAdresseChange,
  onCodePostalChange,
  onVilleChange,
  error,
  id = "adresse",
}: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-suggestions`;
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const abortRef = useRef<AbortController>();

  const closeList = useCallback(() => {
    setOpen(false);
    setHighlighted(0);
  }, []);

  // Ferme la liste si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeList();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeList]);

  // Nettoyage des timers/requêtes
  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const handleInputChange = (input: string) => {
    onAdresseChange(input);
    clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    if (input.trim().length < 3) {
      setSuggestions([]);
      closeList();
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(input.trim())}&limit=5&autocomplete=1`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (controller.signal.aborted) return;
        const items: Suggestion[] = (data.features ?? [])
          .map((f: any) => f.properties)
          .filter((p: any) => p && p.name)
          .map((p: any) => ({
            label: p.label ?? p.name,
            name: p.name,
            postcode: p.postcode ?? "",
            city: p.city ?? "",
          }));
        setSuggestions(items);
        if (items.length > 0) {
          setHighlighted(0);
          setOpen(true);
        } else {
          closeList();
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          // En cas d'échec de l'API, le champ reste saisissable à la main
          setSuggestions([]);
          closeList();
        }
      }
    }, 250);
  };

  const selectSuggestion = (s: Suggestion) => {
    onAdresseChange(s.name);
    onCodePostalChange(s.postcode);
    onVilleChange(s.city);
    setSuggestions([]);
    closeList();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const s = suggestions[highlighted];
      if (s) selectSuggestion(s);
    } else if (e.key === "Escape") {
      closeList();
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <Input
        id={id}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="12 rue de la République"
        className={cn(error ? "border-destructive" : "")}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
      />

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 w-full mt-1 rounded-[6px] border border-border bg-background shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((s, idx) => (
            <li
              key={`${s.label}-${idx}`}
              role="option"
              aria-selected={idx === highlighted}
              className={cn(
                "px-3 py-2 text-sm cursor-pointer border-l-4",
                idx === highlighted
                  ? "bg-rose-50 border-l-[#c80000]"
                  : "border-l-transparent hover:bg-muted"
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                selectSuggestion(s);
              }}
              onMouseEnter={() => setHighlighted(idx)}
            >
              <span className="block font-medium text-foreground">{s.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
