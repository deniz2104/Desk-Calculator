### Desktop Calculator from scratch

## Descriere:

Proiectul se refera la un calculator de mana folosind JavaScript,CSS si HTML.

## Executare comenzi:

Calculatorul poate executa urmatoarele comenzi:

- Adunare(+);
- Scadere(-);
- Inmultire(\*);
- Impartire(/);
- Curatare ecran(C);
- Egal(=);

Userul poate interactiona asupra comenzilor folosind Tab,Shift+Tab si Enter sau apasand pe butoanele de pe ecran.

## Motivatia proiectului:

Principala motivatie a fost implementarea logicii operatiilor aritmetice si dezvoltarea unui evaluator de expresie fara a folosi functia predefinita eval().

## Implementare:

Functionalitatea principala se leaga de functiile:

- `custom_eval_funct()` care include:
  -
  -
  -
- `displayResult()`
- `updateDisplay()`
-

## Motive pentru care nu am folosit functia predefinita eval():

1. Securitate:

   - eval() poate executa cod arbitrar,ceea ce inseamna ca reprezinta un risc de securitate daca nu este corect folosit de user

2. Performanta:

   - functia predefinita eval() poate fi mai inceata decat un evaluator implementat folosind operatii aritmetice

3. Controlul aplicatiei:

   - Putem avea control absolut asupra inputului care vine de la user avand in vedere ca multe edge case-uri sunt tratate.

4. Implementand de la inceput logica aplicatiei,m-a ajutat la dezvoltarea skillurilor privind stringurile si modul in care prelucram numerele in display.

## Probleme intalnite de-a lungul proiectului :

1. Principala problema reprezinta modul in care sunt tratate stringurile si modul in care voiam sa afisez numerele in display.
   Avand in vedere ca folosesc '.' pentru ordinul miilor si ',' pentru zecimale,am intalnit o problema atunci cand foloseam functia `parseFloat()`.
   Atunci cand functia intalnea caracterul ',' totul era ignorat pentru ca in Javascript zecimalele sunt prelucrate cu '.',deci,am implementat o functie auxiliara `formatWithThousandSeparator_used_for_eval()` pentru a formata stringul corect.

2. Functia `updateDisplay()` este rudimentara pentru o interfata user-friendly.Atunci cand userul introducea un numar de ordinul miilor interveneau problemele avand in vedere logica initiala.
   Separam display-ul in functie de caracterul ',' ceea ce a dus la erori logice.Dupa ce prelucra un numar,celalalt nu mai putea fi prelucrat.Asadar,am separat display-ul in functie de operatori si am prelucrat fiecare parte.

## Viitoare imbunatatiri:

Proiectul este functional,dar,urmeaza sa adaug imbunatiri:

- Alert messages user-friendly,sa nu mai fie afisate prin intermediul browserului
- In caz ca doresc sa schimb operatorul,sa se modifice cu cel anterior in caz ca nu adaug cifra
- Anti-spam modificat prin timp de o secunda intre click-uri
- Sa pot incepe si cu '+' si sa pot schimba cu '-' daca nu introduc cifra
- Atunci cand egalez in continuare acelasi numar sa retin numarul si operatorul si operatiile sa continue
