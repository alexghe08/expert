
# ExpertAchiziții - Sistem Automatizat de Gestiune a Achizițiilor Publice

## Descriere Generală
ExpertAchiziții este o platformă completă pentru gestionarea procesului de achiziții publice, oferind automatizare și validare conform legislației în vigoare (Legea 98/2016 și HG 395/2016).

## Configurare Sistem

### 1. Credențiale Supabase
```env
VITE_SUPABASE_URL=https://whrpnqvnujhzqljjmxum.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocnBucXZudWpoenFsampteHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzQyNjMsImV4cCI6MjA2MTExMDI2M30.DKZ5yPiR9RKOzSP65-Ba5ZYX-sLqJ9cXnsolb_Vntl8
```

### 2. Cont Administrator
- **Email:** alex@admin.com
- **Parolă:** Admin123!
- **Rol:** Administrator cu drepturi complete

## Structura Bazei de Date

### 1. Tabele Principale
- **referate**
  - Justificare (JSON)
  - Obiect achiziție (JSON)
  - Specificații tehnice (JSON)
  - Valoare estimată (JSON)
  - Sursa finanțare (JSON)

- **caiete_sarcini**
  - Informații generale (JSON)
  - Specificații tehnice (JSON)
  - Criterii calificare (JSON)
  - Livrabile (JSON)

- **strategii**
  - Justificare procedură
  - Tip procedură
  - Calendar procedură (JSON)
  - Criterii atribuire (JSON)
  - Riscuri (JSON)
  - Ajustare preț (JSON)

- **fisa_date**
  - Autoritate contractantă (JSON)
  - Obiectul achiziției (JSON)
  - Criterii calificare (JSON)
  - Procedură achiziție (JSON)

### 2. Tabele Suport
- **document_flow** (Gestionare flux documente)
- **document_versions** (Versionare documente)
- **validari** (Validări legislative)
- **notifications** (Notificări sistem)
- **users** (Utilizatori sistem)
- **user_permissions** (Permisiuni utilizatori)

## Funcții RPC Supabase

### 1. Gestionare Flux Documente
```sql
initiate_document_flow(referat_id)
propagate_data(source_doc_id, source_type, target_type)
propagate_referat_to_caiet(referat_id)
propagate_referat_to_strategie(referat_id)
```

### 2. Validări
```sql
validate_document(doc_id, doc_type)
validate_referat(data)
validate_caiet(data)
validate_strategie(data)
validate_consolidare_seismica(data)
```

## Structura Proiect

```
src/
├── components/
│   ├── forms/
│   │   ├── ReferatForm.jsx
│   │   ├── CaietForm.jsx
│   │   ├── StrategieForm.jsx
│   │   └── FisaDateForm.jsx
│   └── ui/
│       ├── button.jsx
│       ├── toast.jsx
│       └── toaster.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── ReferatPage.jsx
│   ├── CaietPage.jsx
│   ├── StrategiePage.jsx
│   └── FisaDatePage.jsx
├── services/
│   ├── supabase/
│   │   ├── client.js
│   │   ├── connectionManager.js
│   │   ├── documentService.js
│   │   └── notificationService.js
│   ├── authService.js
│   ├── openaiService.js
│   └── validationService.js
└── validators/
    ├── procurementValidator.js
    └── fisaDateValidator.js
```

## Instalare și Rulare

### 1. Instalare Dependențe
```bash
npm install
```

### 2. Configurare Mediu
- Creați fișierul `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
```

### 3. Dezvoltare
```bash
npm run dev
```

### 4. Producție
```bash
npm run build
npm start
```

## Funcționalități Principale

### 1. Gestionare Documente
- **Referat de Necesitate**
  - Conform Art. 7 și 9, Legea 98/2016
  - Validare automată specificații
  - Generare automată justificare

- **Caiet de Sarcini**
  - Conform Art. 155-156, Legea 98/2016
  - Validare criterii tehnice
  - Import date din referat

- **Strategie de Contractare**
  - Conform Art. 68, Legea 98/2016
  - Analiză riscuri automată
  - Calendar procedural dinamic

- **Fișa de Date**
  - Criterii calificare automate
  - Validare conformitate
  - Import date din strategie

### 2. Validare Legislativă
- Verificare automată conformitate
- Sugestii de îmbunătățire
- Referințe legislative integrate

### 3. Flux Documente
```mermaid
graph TD
    A[Referat] --> B[Caiet Sarcini]
    A --> C[Strategie]
    B --> D[Fișa Date]
    C --> D
```

## Securitate

### 1. Autentificare
- Gestionată prin Supabase Auth
- Row Level Security (RLS)
- Sesiuni securizate

### 2. Permisiuni
- Sistem roluri (admin, user)
- Permisiuni granulare
- Audit logging

## Suport și Asistență

### 1. Documentație
- Ghiduri legislative
- Tutoriale video
- FAQ actualizat

### 2. Contact
- Suport tehnic: support@expertachizitii.ro
- Asistență juridică: legal@expertachizitii.ro

## Licență
Acest proiect este distribuit sub licența MIT. Vezi `LICENSE` pentru detalii.
