pub mod player {

    #[derive(Debug)]
    pub struct Player{
        name: String,
        score: u32,
        number_of_trains: u32,
        cards: Vec<String>,
    }
}