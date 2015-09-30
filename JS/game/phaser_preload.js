function preload(){
	//Maailman raja
	game.world.setBounds(0, 0, 1600, 1000);
	//Ladataan tausta ja asteroidit
    game.load.image('background', 'assets/sprites/VS_background_purple.png');
    game.load.image('asteroid1', 'assets/sprites/VS_peli_asteroid1.png');
    game.load.image('asteroid2', 'assets/sprites/VS_peli_asteroid2.png');
    game.load.image('asteroid3', 'assets/sprites/VS_peli_asteroid3.png');
	//Ladataan alus
	game.load.image('ship', 'assets/sprites/VS_peli_ship.png');
	//Ladataan trail-partikkelit
	game.load.image('trail1', 'assets/particles/VS_peli_trail1.png');
	game.load.image('trail2', 'assets/particles/VS_peli_trail2.png');
	game.load.image('trail4', 'assets/particles/VS_peli_trail4.png');
}