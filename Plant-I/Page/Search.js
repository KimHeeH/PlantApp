import React, { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Image
} from "react-native";
import axios from "axios";
import AppText from "../Components/AppText";
import CustomInput from '../Components/CustomInput';
import { useFocusEffect } from "@react-navigation/native";
import SERVER_ADDRESS from "../Components/ServerAddress";

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagVisibled, setTagVisibled] = useState(true);
  const [selectTags, setSelectTags] = useState("");

  const SearchData = async () => {
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/plantdb/search`);
      const data = response.data;
      const filterData = data.filter(item => item.Pname.toLowerCase().includes(searchQuery.toLowerCase()));
      if(searchQuery === "") {
        setTagVisibled(true);
      } else {
        setSearchResults(filterData);
      }
    }
    catch (error) {
      console.log(error);
    };
  }

  useFocusEffect(
    useCallback(() => {
      const Tag = () => {
        axios.post(`${SERVER_ADDRESS}/tagdb/tag`)
        .then(response => {
          const data = response.data;
          setTags(data);
        })
        .catch(error => {
          console.log(error);
        })
      }
    Tag();
    return () => {}
    }, [])
  );

  const handleSearchData = (text) => {
    setSearchQuery(text);
    setTagVisibled(!text);
  };


  const selectTagData = (tag) => {
    axios.post(`${SERVER_ADDRESS}/plantdb/selectTag`, {
      PlantType: tag
    })
    .then(response => {
      const data = response.data.map(item=>item);
      setSearchResults(data);
      console.log(searchResults)
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleTagSelect = (tag) => {
    selectTagData(tag);
    setTagVisibled(false);
    console.log(tag);
  }

  useEffect(() => {
    SearchData();
  }, [searchQuery]);

  const renderFilterItems = ({ item, index }) => {
    return(
      <TouchableOpacity 
        style={[styles.resultItem, { width: item.Image ? '48%' : '48%' }]}
        onPress={() => navigation.navigate("PlantDetail", {Pname: item.Pname})}
      >
        <Image 
          source={{uri: item.Image}}
          style = {styles.imageContainer}
        />
        <AppText bold style = {styles.PnameStyles}>{item.Pname}</AppText>
      </TouchableOpacity>
  )};

  const TagsData = ({ item }) => {

    return (
      <View>
        <AppText bold style = {{ fontSize: 18 }}>추천 검색어</AppText>
        <View>
          <FlatList
            data={tags}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.hashtagItem}
                onPress={() => handleTagSelect(item.Tag_Name)}
              >
                <AppText bold style={styles.hashtagItemText}>{item.Tag_Name}</AppText>
              </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );

  }
  
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.searchContainer}>
            <CustomInput
              style={styles.searchInput}
              placeholder="식물을 검색해보세요"
              value={searchQuery}
              onChangeText={handleSearchData}
              keyboardShouldPersistTaps="handled"
            />
            <TouchableOpacity style={styles.searchButton} onPress={() => SearchData()}>
              <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.line}></View>

      {(searchQuery.length > 0 || !tagVisibled) && (
        <View style = {{ height: '94%', flex: 1 }}>
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderFilterItems}
            horizontal={false}
            numColumns={2}
          />
        </View>
      )}
      {tagVisibled && <TagsData />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '6%',
    backgroundColor: 'white',
    width: '100%'
  },
  searchContainer: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 1,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
  },
  searchInput: {
    flex: 1,
    padding: '3%',
  },
  searchButton: {
    padding: "3%",
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginBottom: '2%',
  },
  resultItem: {
    height: 185 ,
    marginTop: "3%",
    marginRight: "4%",
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    width: '100%',
    borderRadius: 5
  },
  PnameStyles: {
    alignSelf: 'center',
    top: '5%',
    fontSize: 12
  },
  hashtagItem: {
    marginRight: 10,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 5,
    backgroundColor: "#DFDFDF",
    width: 105,
    height: 30,
    borderRadius: 5,
    alignSelf: "center",
  },
  hashtagItemText: {
    fontSize: 13
  },
});

export default Search;

