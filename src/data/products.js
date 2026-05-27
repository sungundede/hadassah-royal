export const suits = [
  { id: 1, name: "Midnight Black Slim Suit", price: 420, category: "suits", tag: "Bestseller", description: "Tailored slim-fit suit in pure wool blend. A timeless essential for the modern gentleman." },
  { id: 2, name: "Charcoal Three-Piece Suit", price: 510, category: "suits", tag: "New", description: "Classic three-piece in charcoal grey. Includes jacket, waistcoat and trousers." },
  { id: 3, name: "Navy Pinstripe Suit", price: 460, category: "suits", tag: null, description: "Sharp pinstripe suiting in deep navy. Cut for boardroom confidence." },
  { id: 4, name: "Ivory Linen Summer Suit", price: 380, category: "suits", tag: "New", description: "Breathable linen suit in ivory — perfect for weddings and warm-weather occasions." },
];

export const shirts = [
  { id: 5, name: "Crisp White Oxford Shirt", price: 95, category: "shirts", tag: "Bestseller", description: "A wardrobe essential. 100% Egyptian cotton with a spread collar and mother-of-pearl buttons." },
  { id: 6, name: "Royal Blue Dress Shirt", price: 110, category: "shirts", tag: null, description: "Slim-fit dress shirt in rich royal blue. Pairs beautifully with both navy and charcoal suits." },
  { id: 7, name: "Black Satin Shirt", price: 130, category: "shirts", tag: "New", description: "Luxurious satin finish shirt — the statement piece for evening occasions." },
  { id: 8, name: "Subtle Check Shirt", price: 105, category: "shirts", tag: null, description: "Tonal check pattern in warm grey. Smart-casual versatility at its finest." },
];

export const shoes = [
  { id: 9, name: "Black Cap Toe Oxford", price: 280, category: "shoes", tag: "Bestseller", description: "Hand-finished leather oxford with a classic cap toe. The cornerstone of any formal wardrobe." },
  { id: 10, name: "Tan Derby Shoes", price: 245, category: "shoes", tag: "New", description: "Full-grain tan leather derby. Transitions effortlessly from the office to the weekend." },
  { id: 11, name: "Burgundy Monk Strap", price: 310, category: "shoes", tag: null, description: "Double monk strap in deep burgundy. Bold, refined and unmistakably distinguished." },
  { id: 12, name: "White Leather Loafer", price: 220, category: "shoes", tag: "New", description: "Clean leather penny loafer in crisp white. The perfect summer statement shoe." },
];

export const newArrivals = [suits[1], suits[3], shirts[2], shoes[1], shoes[3]];

export const allProducts = [...suits, ...shirts, ...shoes];
