pub mod tgraph {
    use std::collections::HashMap;

    pub struct Graph<T> {
        adj: HashMap<T,HashMap<T,usize>>
    }


    impl< T: Eq + std::hash::Hash + Clone + std::fmt::Debug > Graph<T> {
        pub fn new() -> Graph<T> {
            Graph { 
                adj: HashMap::<T, HashMap<T, usize>>::new()
            }
        }

        pub fn add_node(&mut self, node: T){
            self.adj.insert(node, HashMap::new());
        }

        //Node1 is the node that is the start node of the edge and node2 is the end node
        pub fn add_bidirectional_edge(&mut self, node1: T, node2: T, edge_weight: usize){
            match self.adj.get_mut(&node1) {
                Some(value) => {
                    value.insert(node2.clone(), edge_weight);
                },
                None => panic!("The node dosent dont exist"),
            }

            match self.adj.get_mut(&node2) {
                Some(value) => {
                    value.insert(node1, edge_weight);
                },
                None => panic!("The node doesn't exist"),
            }
        }

        //Gets the key value pair of the given node
        pub fn get_node(&mut self, node: &T) -> (&T, &HashMap<T, usize>){
            match self.adj.get_key_value(node) {
                Some(node) => node,
                None => panic!("The node dosent exist in the graph"),
            }
        }
        
        //Gets the neighbours of the given node
        pub fn get_neighbors(&mut self, node: &T) -> &HashMap<T, usize>{
            match self.adj.get(node) {
                Some(neighbours) => neighbours,
                None => panic!("Couldnt get the neighbours of the given node"),
            }
        }

        pub fn is_node_in_graph(&mut self, node: &T) -> bool{
            match self.adj.get(node) {
                Some(_) => true,
                None => false,
            }
        }

        pub fn get_nodes_iterator(&mut self) -> std::collections::hash_map::Keys<T, HashMap<T, usize>> {
            self.adj.keys()
        }

        pub fn get_adjecencylist(&mut self) -> std::collections::hash_map::Values<T, HashMap<T, usize>> {
            self.adj.values()
        }

        pub fn get_graph(&mut self) -> &HashMap<T, HashMap<T, usize>> {
            &self.adj
        }

        pub fn print_graph(&mut self){
            self.get_graph().iter().for_each(|(key,value)| {
                println!("Node: {:?} Neighbours: {:?}",key,value)
            })
        }

        pub fn reset_graph(&mut self){
            self.adj.clear();
        }
    }
}