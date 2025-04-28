
import { jsPDF } from "jspdf";

export function generatePDF(document, type = "referat") {
  const doc = new jsPDF();
  const lineHeight = 10;
  let yPosition = 20;

  const addTitle = (title) => {
    doc.setFontSize(16);
    doc.text(title, 20, yPosition);
    yPosition += lineHeight * 2;
    doc.setFontSize(12);
  };

  const addField = (label, value) => {
    doc.setFont(undefined, 'bold');
    doc.text(label + ":", 20, yPosition);
    doc.setFont(undefined, 'normal');
    
    const maxWidth = 170;
    const lines = doc.splitTextToSize(value || "", maxWidth);
    doc.text(lines, 20, yPosition + lineHeight);
    
    yPosition += (lines.length + 1) * lineHeight;
  };

  const addSection = (title, fields) => {
    doc.setFont(undefined, 'bold');
    doc.text(title, 20, yPosition);
    yPosition += lineHeight;
    doc.setFont(undefined, 'normal');

    Object.entries(fields).forEach(([label, value]) => {
      if (yPosition > doc.internal.pageSize.height - 30) {
        doc.addPage();
        yPosition = 20;
      }
      addField(label, value);
    });
    yPosition += lineHeight;
  };

  if (type === "fisa_date") {
    addTitle("Fișa de Date a Achiziției");

    // Autoritate Contractantă
    if (document.autoritate_contractanta) {
      addSection("Autoritate Contractantă", {
        "Denumire": document.autoritate_contractanta.denumire,
        "Adresă": document.autoritate_contractanta.adresa,
        "Contact": document.autoritate_contractanta.contact
      });
    }

    // Obiectul Achiziției
    if (document.obiectul_achizitiei) {
      addSection("Obiectul Achiziției", {
        "Descriere": document.obiectul_achizitiei.descriere,
        "Cod CPV": document.obiectul_achizitiei.cod_cpv,
        "Valoare Estimată": document.obiectul_achizitiei.valoare_estimata + " RON"
      });
    }

    // Procedura
    if (document.procedura_achizitie) {
      addSection("Procedura de Achiziție", {
        "Tip Procedură": document.procedura_achizitie.tip_procedura,
        "Criteriu Atribuire": document.procedura_achizitie.criteriu_atribuire
      });
    }

    // Criterii
    if (document.criterii_calificare) {
      addSection("Criterii de Calificare", {
        "Documente Solicitate": document.criterii_calificare.documente_solicitate,
        "Cerințe Tehnice": document.criterii_calificare.cerinte_tehnice
      });
    }

    // Garanții
    if (document.garantii) {
      addSection("Garanții", {
        "Garanție Participare": document.garantii.participare,
        "Garanție Bună Execuție": document.garantii.buna_executie
      });
    }
  } else {
    // Original Referat PDF generation
    addTitle("Referat de Necesitate");
    addField("Titlu", document.titlu);
    addField("Obiect", document.obiect);
    addField("Cod CPV", document.cod_cpv);
    addField("Valoare Estimată", document.valoare_estimata + " RON");
    addField("Cheltuieli Neprevăzute", document.cheltuieli_neprevazute + " RON");
    addField("Sursă Finanțare", document.sursa_finantare);
    addField("Durată Contract", document.durata_contractului + " luni");
    addField("Justificare", document.justificare);
  }

  // Add footer with date
  const date = new Date().toLocaleDateString('ro-RO');
  doc.setFontSize(10);
  doc.text(`Document generat la data: ${date}`, 20, doc.internal.pageSize.height - 20);

  return doc;
}
