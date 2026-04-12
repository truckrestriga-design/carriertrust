export function countryFromVat(vatRaw: string): string | "" {
    const vat = (vatRaw || "").trim().toUpperCase();
  
    const prefix = vat.slice(0, 2);
    const map: Record<string, string> = {
      AT: "Austria",
      BE: "Belgium",
      BG: "Bulgaria",
      CY: "Cyprus",
      CZ: "Czechia",
      DE: "Germany",
      DK: "Denmark",
      EE: "Estonia",
      EL: "Greece",
      ES: "Spain",
      FI: "Finland",
      FR: "France",
      HR: "Croatia",
      HU: "Hungary",
      IE: "Ireland",
      IT: "Italy",
      LT: "Lithuania",
      LU: "Luxembourg",
      LV: "Latvia",
      MT: "Malta",
      NL: "Netherlands",
      PL: "Poland",
      PT: "Portugal",
      RO: "Romania",
      SE: "Sweden",
      SI: "Slovenia",
      SK: "Slovakia",
  
      // Часто встречается вне EU формата:
      GB: "United Kingdom",
      CH: "Switzerland",
      NO: "Norway",
    };
  
    return map[prefix] || "";
  }
  