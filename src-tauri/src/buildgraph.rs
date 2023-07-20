pub mod buildgraph {
    use crate::node::tnode::Node;
    use crate::graph::tgraph::Graph;


    pub fn build_graph() -> Graph<Node>{
        let mut g: Graph<Node> = Graph::new();


        let sanfran = Node::new(1,"San Fransisco".to_string());
        let la = Node::new(2,"Los Angeles".to_string());
        let vegas = Node::new(3,"Las Vegas".to_string());
        let salt_lake = Node::new(4,"Salt Lake City".to_string());
        let phoenix = Node::new(5,"Phoenix".to_string());
        let el_paso = Node::new(6,"El Paso".to_string());
        let santa_fe = Node::new(7,"Santa Fe".to_string());


        g.add_node(sanfran.clone());
        g.add_node(la.clone());
        g.add_node(vegas.clone());
        g.add_node(salt_lake.clone());
        g.add_node(phoenix.clone());
        g.add_node(el_paso.clone());
        g.add_node(santa_fe.clone());

        g.add_bidirectional_edge(sanfran.clone(), la.clone(), 3);
        g.add_bidirectional_edge(sanfran, salt_lake.clone(), 5);
        g.add_bidirectional_edge(la.clone(), vegas.clone(), 2);
        g.add_bidirectional_edge(la, phoenix.clone(), 6);
        g.add_bidirectional_edge(vegas, salt_lake, 3);
        g.add_bidirectional_edge(phoenix.clone(), el_paso.clone(), 3);
        g.add_bidirectional_edge(santa_fe, el_paso, 3);

        g
    }
}