pub mod tedge{
    // use crate::player::player::Player;
    use crate::color_enum::color_enum::Color;

    //TODO: Since i dont care about the direction of the edges i need to add both end points in the edge struct
    #[derive(Debug, Hash, Clone,PartialEq, Eq)]
    pub struct Edge<'a, T> {
        node_1: &'a T,
        node_2: &'a T,
        color: Color,
        nmbr_of_trains: u32,
        //owner: Player
    }

    impl <'a, T> Edge<'a,T> {
        pub fn new(node_1: &'a T, node_2: &'a T, color: Color, nmbr_of_trains: u32) -> Edge<'a, T> {
            Edge { node_1, node_2, color, nmbr_of_trains}
        }

        pub fn change_connected_nodes(&mut self, node_1: &'a T, node_2: &'a T) {
            self.node_1 = node_1;
            self.node_2 = node_2;
        }

        pub fn change_color(&mut self, color: Color) {
            self.color = color;
        }

        pub fn change_nmbr_of_trains(&mut self, nmbr_of_trains: u32) {
            self.nmbr_of_trains = nmbr_of_trains;
        }

        pub fn get_node_1(self) -> &'a T{
            self.node_1
        }

        pub fn get_node_2(self) ->  &'a T{
            self.node_2
        }
    }
}