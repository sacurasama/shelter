const animals = [
    {
      "name": "Jennifer",
      "img": "img/pets/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "img/pets/pets-sofia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "img/pets/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "img/pets/pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "img/pets/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "img/pets/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "img/pets/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "img/pets/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];


const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal__title');
const modalSubtitle = document.querySelector('.modal__subtitle');
const modalDescription = document.querySelector('.modal__description');
const modalListItems = document.querySelectorAll('.modal__list-item');
const closeButton = document.querySelector('.modal__close-button');
const body = document.body;

const openModal = animal => {
  modalImage.src = animal.img;
  modalTitle.textContent = animal.name;
  modalSubtitle.textContent = `${animal.type} - ${animal.breed}`;
  modalDescription.textContent = animal.description;
  modalListItems[0].querySelector('.modal__list-value').textContent = animal.age;
  modalListItems[1].querySelector('.modal__list-value').textContent = animal.inoculations.join(', ');
  modalListItems[2].querySelector('.modal__list-value').textContent = animal.diseases.join(', ');
  modalListItems[3].querySelector('.modal__list-value').textContent = animal.parasites.join(', ');
  modalOverlay.classList.add('active');
  body.classList.toggle('no-scroll');
};

const closeModal = () => {
  modalOverlay.classList.remove('active'); 
  body.classList.remove('no-scroll');
};

closeButton.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) closeModal();
});

//SLIDER//

const cardsContainer = document.querySelector('.slider-cards');
const leftArrowButton = document.getElementById('left-arrow');
const rightArrowButton = document.getElementById('right-arrow');

let activeCards = [];
let previousCards = null; 
let nextCards = null;
let isAnimating = false; 

const getNumberOfDisplayedCards = () => {
  if (window.innerWidth >= 1077) return 3;
  if (window.innerWidth >= 767 && window.innerWidth < 1077) return 2;
  return 1;
};

const getRandomCards = (usedCards = [], count) => {
  const availableCards = animals.filter(animal => !usedCards.includes(animal));
  if (availableCards.length < count) {
    return [];
  }
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    result.push(availableCards[randomIndex]);
    availableCards.splice(randomIndex, 1);
  }
  return result;
};

const renderCards = () => {
  const createCardHTML = (animal) => `
    <div class="card--pet">
      <img src="${animal.img}" alt="Image of ${animal.name}, a pet" class="card__image"> 
      <p class="card__name">${animal.name}</p>
      <button class="button--secondary">Learn more</button>
    </div>`;

  const previousCardsHTML = previousCards ? previousCards.map(createCardHTML).join('') : '';
  const currentCardsHTML = activeCards.map(createCardHTML).join('');
  const nextCardsHTML = nextCards ? nextCards.map(createCardHTML).join('') : '';

  const container = document.querySelector('.slider-container');
  container.innerHTML = `
    <div class="slider__group slider__previous-slide">${previousCardsHTML}</div>
    <div class="slider__group slider__current-slide">${currentCardsHTML}</div>
    <div class="slider__group slider__next-slide">${nextCardsHTML}</div>`;

  addClickListenersToCards();
};

const addClickListenersToCards = () => {
  cardsContainer.querySelectorAll('.card--pet').forEach(card => {
    card.addEventListener('click', () => {
      const cardName = card.querySelector('.card__name').textContent;
      const animal = animals.find(item => item.name === cardName);
      openModal(animal);
    });
  });
};

const slideTransition = (direction) => {
  if (isAnimating) return; 
  isAnimating = true;

  const container = document.querySelector('.slider-container');
  container.style.transition = 'transform 1.5s ease-in-out'; 
  container.style.transform = direction === 'prev' ? 'translateX(100%)' : 'translateX(-100%)';

  requestAnimationFrame(() => {
    setTimeout(() => {
      renderCards();
      container.style.transition = 'none';
      container.style.transform = 'translateX(0)';
      isAnimating = false; 
    }, 1500); 
  });
};

const showPreviousCards = () => {
  if (isAnimating) return;
  if (previousCards) {
    nextCards = [...activeCards];
    activeCards = previousCards;
    previousCards = getRandomCards(activeCards, getNumberOfDisplayedCards());
    slideTransition('prev');
  } else {
    previousCards = getRandomCards(activeCards, getNumberOfDisplayedCards());
    showPreviousCards();
  }
};

const showNextCards = () => {
  if (isAnimating) return;
  previousCards = [...activeCards];
  activeCards = nextCards || getRandomCards(previousCards, getNumberOfDisplayedCards());
  nextCards = getRandomCards(activeCards, getNumberOfDisplayedCards());
  slideTransition('next');
};

const updateCardsOnResize = () => {
  const numberOfCards = getNumberOfDisplayedCards();
  if (activeCards.length !== numberOfCards) {
    const currentCards = [...activeCards];
    activeCards = getRandomCards([], numberOfCards);

    if (currentCards.length < numberOfCards) {
      const additionalCards = getRandomCards(currentCards, numberOfCards - currentCards.length);
      activeCards.push(...additionalCards);
    } else {
      activeCards = currentCards.slice(0, numberOfCards);
    }
    previousCards = getRandomCards(activeCards, numberOfCards);
    nextCards = getRandomCards(activeCards, numberOfCards);

    renderCards();
  }
};

const initializeSlider = () => {
  const numberOfCards = getNumberOfDisplayedCards();
  activeCards = getRandomCards([], numberOfCards);
  previousCards = getRandomCards(activeCards, numberOfCards);
  nextCards = getRandomCards(activeCards, numberOfCards);    
  renderCards();
};

leftArrowButton.addEventListener('click', showPreviousCards);
rightArrowButton.addEventListener('click', showNextCards);
window.addEventListener('resize', updateCardsOnResize);

const preloadImages = () => {
  animals.forEach(animal => {
    const img = new Image();
    img.src = animal.img;
  });
};

initializeSlider();