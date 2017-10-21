# Projekt zespołowy

## Cel projektu
Celem projektu jest stworzenie w pełni funkcjonalnego sklepu internetowego opartego w głownej mierze o technologie takie jak: HTML5, CSS3 oraz JavaScript.

## Opis techniczny
Projekt będzie realizowany zgodnie z zasadami tworzenia tzw. aplikacji RESTowych (ang. RESTful application). Relizacja takiej aplikacji wiąże się z rozbiciem jej na dwa integralne elementy - warstwę prezentacji i interakcji z użytkownikiem (frontend) działającą po stronie klienta (w przeglądarce) oraz warstwę odpowiedzialną za mechanikę i manipulację danymi (backend) działającą po stronie serwera. Obie warstwy komunikują się ze sobą przy użyciu REST API, tj. odpowiednich zapytań protokołu HTTP zdefiniowanych po stronie serwerowej. Każda akcja wykonana po stronie klienta skutkuje wysłaniem odpowiedniego żądania do serwera, który po przetworzeniu zapytania zwraca żądane dane i/lub informację o wykonaniu zleconego mu zadania. Taka forma komunikacji zapewnia elastyczność oraz pozwala łączyć ze sobą różne, w inny sposób nie kompatybilne ze sobą technologie, co pozwala programistą na większą swobodę w czasie tworzenia oddzielnych elementów aplikacji.

## Technologie
### Frontend
Celem tej warstwy jest udostępnianie interfejsu do zarządzania aplikacją w wygodny sposób dla klienta.
- [Angular 4](https://angular.io) - opracowana przez firmę Google platforma do tworzenia frontendu aplikacji internetowych 
- [TypeScript](https://typescriptlang.org) - język programowania stanowiący nadzbiór języka JavaScript (do którego jest kompilowany) stworzony przez Microsoft, wprowadzający m.in. obiektowość oraz silne typowanie
- HTML5, CSS3 ([Bootstrap](http://getbootstrap.com)) - Bootstrap jest frameworkiem do języka CSS3 pozwalającym na szybkie tworzenie responsywnych stron internetowych z wykorzystaniem gotowych, modyfikowalnych elementów.

Osobą odpowiedzialną za realizację frontendu jest BL.

### Backend
Celem tej warstwy jest realizowanie logiki biznesowej poprzez obsługę zapytań do REST API.
- [NodeJS](https://nodejs.org) - asynchroniczne środowisko uruchomieniowe do tworzenia skalowalnych aplikacji internetowych (np. serwerów WWW) napisanych w języku JavaScript
- [ExpressJS](https://expressjs.com) - framework oparty na środowisku NodeJS ułatwiający tworzenie aplikacji internetowych
- [TypeScript](https://typescriptlang.org)
- [MongoDB](https://www.mongodb.com) - baza danych NoSQL przechowująca dane w postaci dokumentów reprezentowanych przez obiekty JSON, co ułatwia ich przetwarzanie w aplikacjach opartych na języku JavaScript
- [JWT](https://jwt.io) - otwarty standard uwierzytelniania przy użyciu tokenów dostępowych w postaci zaszyfrowanych obiektów JSON

Osobą odpowiedzialną za realiację backendu jest KD.

## Spis funkcjonalności
- Rejestracja oraz logowanie dla klientów
- Umieszczanie produktów w koszyku
- Wyświetlanie listy produktów (opcjonalnie przefiltrowanych)
- Mozliwość złożenia zamówienia
- Realizacja kuponów rabatowych
- Panel administracyjny dla obsługujących sklep
    - zarządzanie produktami
    - zarządzanie kategoriami produktów
    - zarządzanie klientami
    - realizacja zamówień
    - zarządzanie kuponami rabatowymi - generowanie, anulowanie
    
### Harmonogram
* 22.10 - Opracowanie specyfikacji, stworzenie repozytorium oraz umieszczenie na nim podstawowych szablonów na których będzie budowany zarówno frontend, jak i backend.
* 5.11 - Opracowanie systemu rejestracji oraz logowania dla obu typów użytkowników - klientów oraz administratorów sklepu
* 19.11 - Podstawowe funkcjonalności administratora sklepu - możliwość dodawania produktów do katalogu, zarządzanie kategoriami. Po stronie klienta - możliwość przeglądania i sortowania produktów.
* 26.11 - Rozbudowanie możliwości klienta - dodawanie produktów do koszyka oraz formularz realizacji zamówień. Po stronie administratora możliwość zmiany statusu zamówienia (oczekujące, w realizacji, wysłane) lub anulowania go.
* 10.12 - Funkcjonalność kuponów rabatowych - możliwość dodawania i usuwania kuponów po stronie administratora; możliwość stosowania kuponów po stronie klienta. Dodatkowo możliwość podstawowych czynności związanych z zarządzaniem klientami po stronie administratora - blokowanie oraz usuwanie ich kont.
* 17.12 - Dopracowanie istniejącego kodu i poprawa ew. wadliwych funkcjonalności oraz dopracowanie aspektów graficznych oraz interfejsu użytkownika.
* 14.01 - Stworzenie dokumentacji oraz zakończenie projektu.
