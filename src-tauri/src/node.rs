pub mod tnode{

    #[derive(Debug, Hash, Clone, serde::Serialize, serde::Deserialize)]
    pub struct Node {
        name: String,
    }
    
    impl Node {
        pub fn new(name: String) -> Node {
            Node { name }
        }

        pub fn set_name(&mut self, name: String) {
            self.name = name;
        }

        pub fn get_name(&self) -> String {
            self.name.clone()
        }

    }

    impl PartialEq for Node{
        fn eq(&self, other: &Node) -> bool {
            self.name == other.name
        }
    }

    impl Eq for Node{}

}