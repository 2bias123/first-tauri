pub mod short_path {
    use crate::graph::tgraph::Graph;
    use std::cmp::Reverse;
    use std::collections::HashMap;
    use std::collections::BinaryHeap;

    #[derive(Debug)]
    pub struct Wrapper<T>(usize, T);
    
    impl<T> PartialEq for Wrapper<T> {
        fn eq(&self, other: &Self) -> bool {
            self.0 == other.0
        }
    }
    
    impl<T> Eq for Wrapper<T> {}
    
    impl<T> PartialOrd for Wrapper<T> {
        fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
            self.0.partial_cmp(&other.0)
        }
    }
    
    impl<T> Ord for Wrapper<T> {
        fn cmp(&self, other: &Self) -> std::cmp::Ordering {
            self.0.cmp(&other.0)
        }
    }

    pub fn djikstras<T: Eq + std::hash::Hash + Clone + std::fmt::Debug>(g: &mut Graph<T>,src: T, dest: T) -> Vec<T> {
        
        let mut distancemap: HashMap<T, usize> = HashMap::new();
        
        //Initialize all distances to infinity except for source node
        g.get_nodes_iterator().for_each(|node| {
            if node == &src {
                distancemap.insert(node.clone(), 0);
            } else {
                distancemap.insert(node.clone(), std::usize::MAX);
            }
        });

        //Makes a priority queue with the distance as the key and the node as the value so it can be sorted by distance
        let mut priority_queue: BinaryHeap<Reverse<Wrapper<T>>> = BinaryHeap::new();
        priority_queue.push(Reverse(Wrapper(0, src.clone())));

        //Keep track of the previous node in the shortest path
        let mut previous_node_in_the_shortest_path: HashMap<T, T> = HashMap::new();

        /*This section of code runs until the priority queue is empty. 
        It takes the smallest element in the pq and checks if the the distance to the neighbours of the node is shorter than the current distance.
        If it is shorter it updates the distance hashmap and the previous node hashmap and pushes the node to the priority queue.
        */
        while !priority_queue.is_empty() {
            let mut minimum_node = match priority_queue.pop() {
                Some(Reverse(Wrapper(_, node))) => node,
                None => panic!("Priority queue is empty"),
            };

            g.get_neighbors(&minimum_node).iter().for_each(|(neighbour,edge_weight)|{
                let tentative_distance = distancemap.get(&minimum_node).unwrap() + edge_weight;
                if tentative_distance < *distancemap.get(neighbour).unwrap(){
                    distancemap.insert(neighbour.clone(), tentative_distance);
                    previous_node_in_the_shortest_path.insert(neighbour.clone(), minimum_node.clone());
                    priority_queue.push(Reverse(Wrapper(tentative_distance, neighbour.clone())));
                }
            });
        };

        //Constructs the path from the destination node to the source node with the previous node hashmap
        let mut current = dest.clone();
        let mut path = vec![dest.clone()];

        while !(current == src){
            let prev = previous_node_in_the_shortest_path[&current].clone();
            path.push(prev.clone());
            current = prev;
        } 

        path.reverse();
        path
    }
}