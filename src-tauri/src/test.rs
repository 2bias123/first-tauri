mod test {
    use crate::node::tnode::Node;
    use crate::graph::tgraph::Graph;
    use crate::shortest_path::short_path::djikstras;

    fn buld_test_graph() -> Graph<Node>{
        let mut g: Graph<Node> = Graph::new();

        let zero = Node::new(0,"Zero".to_string());
        let one = Node::new(1,"One".to_string());
        let two = Node::new(2,"Two".to_string());
        let three = Node::new(3,"Three".to_string());
        let four = Node::new(4,"Four".to_string());
        let five = Node::new(5,"Five".to_string());
        let six = Node::new(6,"Six".to_string());
        let seven = Node::new(7,"Seven".to_string());
        let eight = Node::new(8,"Eight".to_string());

        g.add_node(zero.clone());
        g.add_node(one.clone());
        g.add_node(two.clone());
        g.add_node(three.clone());
        g.add_node(four.clone());
        g.add_node(five.clone());
        g.add_node(six.clone());
        g.add_node(seven.clone());
        g.add_node(eight.clone());

        g.add_bidirectional_edge(zero.clone(), one.clone(), 4);
        g.add_bidirectional_edge(zero.clone(), seven.clone(), 8);
        g.add_bidirectional_edge(one.clone(), two.clone(), 8);
        g.add_bidirectional_edge(one.clone(), seven.clone(), 11);
        g.add_bidirectional_edge(two.clone(), three.clone(), 7);
        g.add_bidirectional_edge(two.clone(), five.clone(), 4);
        g.add_bidirectional_edge(two.clone(), eight.clone(), 2);
        g.add_bidirectional_edge(three.clone(), four.clone(), 9);
        g.add_bidirectional_edge(three.clone(), five.clone(), 14);
        g.add_bidirectional_edge(four.clone(), five.clone(), 10);
        g.add_bidirectional_edge(five.clone(), six.clone(), 2);
        g.add_bidirectional_edge(six.clone(), seven.clone(), 1);
        g.add_bidirectional_edge(six.clone(), eight.clone(), 6);
        g.add_bidirectional_edge(seven.clone(), eight.clone(), 7);

        g
    }

    #[test]
    fn test_djikstras_1() {
        let zero = Node::new(0,"Zero".to_string());
        let one = Node::new(1,"One".to_string());
        let two = Node::new(2,"Two".to_string());
        let three = Node::new(3,"Three".to_string());
        let four = Node::new(4,"Four".to_string());
        let five = Node::new(5,"Five".to_string());
        let six = Node::new(6,"Six".to_string());
        let seven = Node::new(7,"Seven".to_string());
        let eight = Node::new(8,"Eight".to_string());

        let fasit = vec![zero.clone(),seven.clone(),six.clone(),five.clone(),four.clone()];

        let mut g = buld_test_graph();

        let path = djikstras(&mut g, zero, four);

        assert_eq!(path, fasit)
    }

    //This test wont pass becasue it goes to seven and not via 2 and 1 which is correct
    #[test]
    fn test_djikstras_2() {
        let zero = Node::new(0,"Zero".to_string());
        let one = Node::new(1,"One".to_string());
        let two = Node::new(2,"Two".to_string());
        let three = Node::new(3,"Three".to_string());
        let four = Node::new(4,"Four".to_string());
        let five = Node::new(5,"Five".to_string());
        let six = Node::new(6,"Six".to_string());
        let seven = Node::new(7,"Seven".to_string());
        let eight = Node::new(8,"Eight".to_string());

        let fasit = vec![eight.clone(),two.clone(),one.clone(),zero.clone()];

        let mut g = buld_test_graph();

        let path = djikstras(&mut g, eight, zero);

        println!("{:?}", path);

        assert_eq!(path, fasit)
    }

    #[test]
    fn test_djikstras_3() {
        let zero = Node::new(0,"Zero".to_string());
        let one = Node::new(1,"One".to_string());
        let two = Node::new(2,"Two".to_string());
        let three = Node::new(3,"Three".to_string());
        let four = Node::new(4,"Four".to_string());
        let five = Node::new(5,"Five".to_string());
        let six = Node::new(6,"Six".to_string());
        let seven = Node::new(7,"Seven".to_string());
        let eight = Node::new(8,"Eight".to_string());

        let fasit = vec![one.clone(),two.clone(),five.clone()];

        let mut g = buld_test_graph();

        let path = djikstras(&mut g, one, five);

        assert_eq!(path, fasit)
    }

    #[test]
    fn test_get_nodes_iterator() {
        let mut g = buld_test_graph();

        let mut iter = g.get_nodes_iterator();

        let mut count = 0;

        while let Some(node) = iter.next() {
            count += 1;
        }

        assert_eq!(count, 9)
    }

    #[test]
    fn test_get_neighbors() {
        let mut g = buld_test_graph();

        let mut eight = Node::new(8,"Eight".to_string());

        let mut iter = g.get_neighbors(&eight).keys();

        let two = Node::new(2,"Two".to_string());
        let six = Node::new(6,"Six".to_string());
        let seven = Node::new(7,"Seven".to_string());

        let neighbors = vec![two, six, seven];

        for node in iter {
            assert!(neighbors.contains(node))
        }
    }

    #[test]
    fn test_get_neighbors_weight_1() {
        let mut g = buld_test_graph();

        let mut eight = Node::new(8,"Eight".to_string());

        let mut iter = g.get_neighbors(&eight).values();

        let weights = vec![2, 6, 7];

        for weight in iter.clone() {
            assert!(weights.contains(weight))
        }
    }

    #[test]
    fn test_get_neighbors_weight_2() {
        let mut g = buld_test_graph();

        let five = Node::new(5,"Five".to_string());

        let mut iter = g.get_neighbors(&five).values();
                
        let weights = vec![2,10,14,4];

        for weight in iter {
            assert!(weights.contains(weight))
        }
    }
}